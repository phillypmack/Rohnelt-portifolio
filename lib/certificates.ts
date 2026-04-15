export type Certificate = {
  title: string
  issuer: string
  date: string
  credentialUrl?: string
  image?: string
}

export const certificates: Certificate[] = [
  // Adicione seus certificados aqui seguindo o formato:
  // {
  //   title: "Nome do Certificado",
  //   issuer: "Instituição Emissora",
  //   date: "2026",
  //   credentialUrl: "https://link-para-verificacao.com",
  //   image: "/certificates/nome-do-arquivo.png",
  // },
]
