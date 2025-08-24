import os
import cloudinary
import cloudinary.uploader
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import abort
import requests
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

try:
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client.dddtodesco
    produtos_collection = db.produtos
    client.admin.command('ping')
    print("Conexão com o MongoDB estabelecida com sucesso!")
except Exception as e:
    print(f"Erro ao conectar com o MongoDB: {e}")


try:
    cloudinary.config(
        cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
        api_key=os.getenv('CLOUDINARY_API_KEY'),
        api_secret=os.getenv('CLOUDINARY_API_SECRET'),

    )
    print("Cloudinary conectado!")
except Exception as e:
    print("Erro ao conectar Cloudinary!")



@app.route("/",methods=['GET'])
def hello_world():
    return jsonify("Hello World!")


# @app.route('/api/reviews', methods=['GET'])
# def get_reviews():
#     try:
#         api_key = os.getenv('GOOGLE_API_KEY')
#         account_id = os.getenv('GOOGLE_ACCOUNT_ID')
#         location_id = os.getenv('GOOGLE_LOCATION_ID')
#
#         if not api_key or not account_id or not location_id:
#             return jsonify({'error': 'Credenciais do Google API não configuradas'}), 500
#
#         # O endpoint para listar as avaliações do local
#         reviews_url = f"https://mybusiness.googleapis.com/v4/accounts/{account_id}/locations/{location_id}/reviews"
#
#         # Parâmetros da requisição
#         params = {
#             'key': api_key
#         }
#
#         # Faz a requisição à API do Google
#         response = requests.get(reviews_url, params=params)
#         response.raise_for_status()  # Lança um erro para status de erro (4xx, 5xx)
#
#         data = response.json()
#
#         # O retorno da API já é um JSON com as avaliações
#         # Você pode processar os dados aqui se necessário
#         reviews = data.get('reviews', [])
#
#         return jsonify(reviews), 200
#
#     except requests.exceptions.RequestException as e:
#         # Se houver um erro na requisição (e.g., erro de conexão, 404, 500)
#         return jsonify({'error': f'Erro na requisição à API do Google: {e}'}), 500
#     except Exception as e:
#         # Erro genérico
#         return jsonify({'error': str(e)}), 500


@app.route('/api/produtos', methods=['GET'])
def listar_produtos():
    try:
        # Busca todos os documentos na coleção 'produtos'
        produtos_cursor = produtos_collection.find()

        # Converte o cursor para uma lista e formata o _id para string
        produtos_list = []
        for produto in produtos_cursor:
            # O ObjectId não é serializável em JSON, então o convertemos para string
            produto['_id'] = str(produto['_id'])
            produtos_list.append(produto)

        # Retorna a lista de produtos como JSON com status 200 OK
        return jsonify(produtos_list), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/produtos/<id>', methods=['GET'])
def obter_produto(id):
    try:
        # Converte o id da string para ObjectId
        produto = produtos_collection.find_one({'_id': ObjectId(id)})

        if produto:
            produto['_id'] = str(produto['_id'])  # Converte ObjectId para string
            return jsonify(produto), 200
        else:
            # Se não encontrar, retorna 404
            return jsonify({'error': 'Produto não encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/produtos/categoria/<categoria>', methods=['GET'])
def obter_produtos_por_categoria(categoria):
    try:
        # Busca case-insensitive usando regex
        produtos = list(produtos_collection.find({
            'categoria': {'$regex': f'^{categoria}$', '$options': 'i'}
        }))

        if produtos:
            for produto in produtos:
                produto['_id'] = str(produto['_id'])
            return jsonify(produtos), 200
        else:
            return jsonify({'message': 'Nenhum produto encontrado nessa categoria'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# Rota para criar um novo produto com uma imagem
@app.route('/api/produtos', methods=['POST'])
def criar_produto():
    try:
        # 1. Verifica se há imagens
        if 'imagens' not in request.files:
            return jsonify({'error': 'Nenhum arquivo de imagem enviado'}), 400

        imagens = request.files.getlist('imagens')
        url_imagens = []

        for imagem in imagens:
            resultado_cloudinary = cloudinary.uploader.upload(imagem)
            url_imagens.append({
                "url": resultado_cloudinary['secure_url'],
                "origem": "upload"
            })

        # 2. Dados do produto
        data = request.form
        nome = data.get('nome')
        descricao = data.get('descricao')
        preco = data.get('preco')

        altura = data.get('altura')
        largura = data.get('largura')
        profundidade = data.get('profundidade')
        peso = data.get('peso')
        material = data.get('material')
        origem = data.get('origem')
        categoria = data.get("categoria")
        subcategoria = data.get("subcategoria")  # <- novo campo

        # "destaque" vem como string "true" ou "false"
        destaque = data.get("destaque", "false").lower() in ["true", "1", "yes"]

        # Limita a descrição
        if descricao and len(descricao) > 255:
            descricao = descricao[:255]

        # 3. Monta documento
        # 3. Monta documento
        novo_produto = {
            'nome': nome,
            'descricao': descricao,
            'preco': float(preco) if preco else 0.0,
            'altura': float(altura) if altura else "N/A",
            'largura': float(largura) if largura else "N/A",
            'profundidade': float(profundidade) if profundidade else "N/A",
            'peso': float(peso) if peso else "N/A",
            'material': material if material else "N/A",
            'origem': origem,
            'categoria': categoria,
            'subcategoria': subcategoria,  # <- novo
            'destaque': destaque,  # <- novo (boolean)
            'imagens': url_imagens
        }

        resultado_insercao = produtos_collection.insert_one(novo_produto)

        produto_retornado = novo_produto
        produto_retornado['_id'] = str(resultado_insercao.inserted_id)

        return jsonify(produto_retornado), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500




# --- Fim das Rotas ---


if __name__ == '__main__':
    app.run(debug=True)