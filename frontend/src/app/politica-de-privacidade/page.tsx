// PrivacyPolicy.jsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-justify text-gray-800 py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Política de Privacidade de Dados
        </h1>

        <p>
          A <strong>3D Todesco</strong> se compromete com a segurança de seus
          dados e mantém suas informações no mais absoluto sigilo!
        </p>

        <p>
          Priorizamos a privacidade e a segurança de nossos clientes durante
          toda a navegação e compra pelo site. Todos os dados cadastrados (nome,
          endereço, CPF) nunca serão comercializados ou trocados. Alguns dados
          necessários para que empresas de logística e meios de pagamento possam
          realizar a cobrança e entrega do pedido serão divulgados a terceiros
          apenas quando necessário. Seus dados pessoais são essenciais para que
          seu pedido chegue em segurança.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          LGPD – Lei Geral de Proteção de Dados
        </h2>
        <p>
          A Lei nº 13.709/2018 regulamenta o tratamento de dados pessoais de
          clientes e usuários por empresas públicas e privadas.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          O que são dados pessoais?
        </h2>
        <p>
          Dados pessoais são quaisquer informações capazes de identificar você
          ou qualquer pessoa física, como nome, sobrenome, CPF, RG, CNH,
          Carteira de Trabalho, passaporte, título de eleitor, gênero, idade,
          telefone, e-mail, entre outros.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Cookies</h2>
        <p>
          Utilizamos cookies, pixels e outras tecnologias para reconhecer seu
          navegador ou dispositivo, aprender sobre seus interesses, apresentar
          serviços essenciais, melhorar a experiência de navegação e impedir
          atividades fraudulentas.
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Cookies de sessão:</strong> Temporários, usados durante sua
            visita e expiram ao fechar o navegador.
          </li>
          <li>
            <strong>Cookies persistentes:</strong> Permanecem no dispositivo
            para analisar comportamento e melhorar funcionalidades do site.
          </li>
          {/* <li>
            <strong>Cookies de terceiros:</strong> [EDITAR CONFORME FERRAMENTAS
            UTILIZADAS]
          </li> */}
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Uso de dados pessoais</h2>
        <p>
          Os dados coletados são utilizados apenas para os fins do cadastro ou
          pedido, não sendo divulgados a terceiros, exceto quando necessário
          para cumprimento de obrigações legais.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Segurança</h2>
        <p>
          Todas as transações de pagamento e informações pessoais são
          criptografadas com tecnologia SSL (Secure Socket Layer). Confira
          nossos certificados de segurança:
        </p>

        {/* <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Selo Google Safe Browsing:</strong> O Google verifica
            diariamente a segurança do site.
          </li>
          <li>
            <strong>Certificado SSL:</strong> Criptografia de dados sensíveis,
            garantindo transações seguras.
          </li>
        </ul> */}

        <h2 className="text-2xl font-semibold mt-6">Seus direitos</h2>
        <p>
          Você pode solicitar à 3D Todesco informações sobre tratamento de seus
          dados, correção, anonimização, portabilidade ou revogação do
          consentimento a qualquer momento pelo email{" "}
          <strong>ti3dtodesco@gmail.com</strong>.
        </p>

        <p className="text-gray-500 text-sm mt-6">
          Última atualização: 17 de Agosto de 2025
        </p>
      </div>
    </div>
  );
}
