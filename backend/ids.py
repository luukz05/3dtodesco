# get_ids.py
import requests
import google.auth
from google.auth.transport.requests import Request
import json

# Substitua pelo caminho do seu arquivo JSON de Conta de Serviço
SERVICE_ACCOUNT_FILE = 'sua_chave.json'


def get_access_token():
    """Gera um token de acesso usando as credenciais da conta de serviço."""
    scopes = ['https://www.googleapis.com/auth/business.manage']
    credentials, project_id = google.auth.load_credentials_from_file(SERVICE_ACCOUNT_FILE, scopes=scopes)

    auth_request = Request()
    credentials.refresh(auth_request)

    return credentials.token


def main():
    try:
        # Obtenha o token de acesso
        access_token = get_access_token()
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        # --- Etapa 1: Obter o accountId ---
        print("Obtendo accountId...")
        accounts_url = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
        accounts_response = requests.get(accounts_url, headers=headers)
        accounts_response.raise_for_status()
        accounts_data = accounts_response.json()

        if not accounts_data.get('accounts'):
            print("Nenhuma conta de negócio encontrada. Verifique as permissões.")
            return

        # Pega o primeiro accountId encontrado
        account_id = accounts_data['accounts'][0]['name'].split('/')[-1]
        print(f"✅ accountId encontrado: {account_id}")

        # --- Etapa 2: Obter o locationId ---
        print("\nObtendo locationId...")
        locations_url = f"https://mybusinessbusinessinformation.googleapis.com/v1/accounts/{account_id}/locations"
        locations_response = requests.get(locations_url, headers=headers)
        locations_response.raise_for_status()
        locations_data = locations_response.json()

        if not locations_data.get('locations'):
            print("Nenhum local de negócio encontrado nesta conta. Verifique as permissões.")
            return

        # Itera sobre todos os locais encontrados
        for location in locations_data['locations']:
            location_id = location['name'].split('/')[-1]
            location_name = location['locationName']
            print(f"✅ Local: '{location_name}' | locationId: {location_id}")

    except requests.exceptions.HTTPError as e:
        print(f"Erro HTTP: {e}")
        print(f"Resposta da API: {e.response.text}")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")


if __name__ == "__main__":
    main()