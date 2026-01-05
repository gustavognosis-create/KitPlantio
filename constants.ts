
import { Product, Testimonial, Order, ContactMessage } from './types';

export const MOCK_PRODUCTS: Product[] = [
  // --- PRODUTOS EXISTENTES (GERAL) ---
  {
    id: '2',
    title: 'Kit Educativo Personalizado Infantil',
    price: 3.70,
    description: 'Brinde educativo ideal para festas escolares e aniversários. Ensine as crianças a plantar com este kit colorido contendo sementes, substrato orgânico e pazinha. Personalizável com tema da festa.',
    imageUrl: 'https://i.ibb.co/5Wz6k2Xw/Kit-Plantio-Personalizado-fazendinha.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '9',
    title: 'Combo Kit Plantio + Mimo Semente',
    price: 5.70,
    description: 'O par perfeito para maximizar o impacto! Une a experiência completa do Kit Plantio (vaso e terra) com a praticidade do Mimo Semente (cartão extra). Ideal para kits de boas-vindas e ações completas.',
    imageUrl: 'https://i.ibb.co/vCmjK1wk/brinde-ecologico-sustentavel.jpg',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '0',
    title: 'Brinde Dia do Meio Ambiente (05 Jun)',
    price: 3.70,
    description: 'Kit completo com vasinho, substrato e sementes. Embalagem totalmente personalizável com sua marca ou tema da festa. O melhor custo-benefício.',
    imageUrl: 'https://i.ibb.co/9mG4kcNR/Kit-plantio-personalizado-ecologico-brinde.jpg',
    category: 'Datas Ambientais',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '11',
    title: 'Kit Dia da Árvore - 21 de Setembro',
    price: 3.70,
    description: 'Celebre a força da natureza! Kit especial para o Dia da Árvore. Ideal para ações de reflorestamento simbólico e conscientização nas escolas e empresas. Personalize com sua logo.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Ambientais',
    minOrder: 30,
    availableSeeds: ['Ipê Amarelo', 'Jacarandá', 'Canafístula']
  },
  {
    id: '12',
    title: 'Kit Dia da Terra - 22 de Abril',
    price: 3.70,
    description: 'Honre nosso planeta com um presente vivo. Embalagem 100% biodegradável com arte exclusiva sobre o Dia da Terra (Earth Day). Um manifesto de amor e cuidado com o mundo.',
    imageUrl: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Ambientais',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '13',
    title: 'Kit Dia Mundial da Água - 22 de Março',
    price: 3.70,
    description: 'Água é vida! Kit temático azul focado na conscientização sobre o uso racional dos recursos hídricos. A planta simboliza a necessidade da água para o florescimento da vida.',
    imageUrl: 'https://images.unsplash.com/photo-1533606354432-8df21b22e11e?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Ambientais',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '8',
    title: 'Mimo Semente - Cartão com Sementes',
    price: 2.20,
    description: 'A opção mais econômica para grandes ações! Cartão totalmente personalizado (papel offset ou reciclado) com cápsula de sementes anexada. Perfeito para distribuição em massa e endomarketing.',
    imageUrl: 'https://i.ibb.co/QjjGpXJQ/mimo-semente-cartao-semente.jpg',
    category: 'Eventos Corporativos',
    minOrder: 100,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '5',
    title: 'Kit Plantio Corporativo',
    price: 3.70,
    description: 'Perfeito para ações de conscientização ambiental e Dia da Árvore. Kit compacto com mix de sementes, incentivando o cultivo e a sustentabilidade na empresa.',
    imageUrl: 'https://i.ibb.co/60W2SNyV/Kit-plantio-ecologico-brinde-corporativo.jpg',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '7',
    title: 'Kit Plantio Fazendinha - Cultive a Vida',
    price: 3.70,
    description: 'Lembrancinha temática perfeita para festas infantis. Personalização completa no tema Fazendinha (ex: João Pedro 2 anos) com bichinhos e trator. Inclui vaso, terra, sementes e instruções "Cultive a Vida".',
    imageUrl: 'https://i.ibb.co/p6kqjCQK/Whats-App-Image-2025-12-04-at-10-40-33.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '4',
    title: 'Lembrancinha Setembro Amarelo',
    price: 3.70,
    description: 'Cultive a vida! Lembrancinha especial para campanhas de Setembro Amarelo e Valorização da Vida. Personalizada com mensagens de apoio e esperança (ex: "Falar é a melhor solução").',
    imageUrl: 'https://i.ibb.co/ZzxR2bJT/lembrancinha-setembro-amarelo.jpg',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '10',
    title: 'Kit Janeiro Branco - Saúde Mental',
    price: 3.70,
    description: 'Campanha Janeiro Branco: Quem cuida da mente, cuida da vida. Kit de plantio personalizado para ações de conscientização sobre saúde mental e emocional nas empresas. Um convite ao autocuidado e bem-estar.',
    imageUrl: 'https://images.unsplash.com/photo-1595123550441-d377e017de6a?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Camomila']
  },
  {
    id: '3',
    title: 'Kit Plantio Papel Kraft',
    price: 3.70,
    description: 'Destaque sua marca com brindes corporativos sustentáveis. Kit sofisticado com vaso e sementes, envolto em papel kraft. Ideal para eventos de fim de ano e onboardings.',
    imageUrl: 'https://i.ibb.co/ZZJWWGh/Whats-App-Image-2025-12-04-at-10-39-06-1.jpg',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '6',
    title: 'Kit Plantio Tema de Filmes e Desenhos',
    price: 3.70,
    description: 'Leve a magia do cinema para sua festa! Personalização exclusiva com personagens de filmes, desenhos e séries favoritos das crianças. Sucesso garantido entre os pequenos.',
    imageUrl: 'https://i.ibb.co/prnvXBLB/Whats-App-Image-2025-12-04-at-10-40-32-1.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '1',
    title: 'Brinde para Congressos, Seminários, Fóruns e Feiras',
    price: 3.70,
    description: 'Destaque seu evento com brindes ecológicos que geram conexão. Ideal para congressos e feiras, este kit é leve, fácil de levar e totalmente personalizável com sua identidade visual.',
    imageUrl: 'https://i.ibb.co/TXnRKBs/Whats-App-Image-2025-12-04-at-11-02-53.jpg',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },

  // --- NOVAS DATAS COMEMORATIVAS (SEO OTIMIZADO) ---
  
  {
    id: '201',
    title: 'Lembrancinha Outubro Rosa - Prevenção',
    price: 3.70,
    description: 'Um toque de cuidado. Kit plantio com arte rosa para conscientização sobre o câncer de mama. Ideal para ações corporativas de RH e eventos de saúde.',
    imageUrl: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '202',
    title: 'Kit Plantio Volta às Aulas - Crescer',
    price: 3.70,
    description: 'Brinde escolar educativo. Incentive o cuidado com a natureza desde o primeiro dia de aula. Arte colorida "Aqui plantamos conhecimento".',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Feijão Mágico']
  },
  {
    id: '203',
    title: 'Lembrancinha Dia das Mães - Amor que Floresce',
    price: 3.70,
    description: 'Um presente vivo para quem gera vida. Arte floral delicada com frases de carinho (ex: "Mãe, você é minha raiz"). Perfeito para escolas e igrejas.',
    imageUrl: 'https://images.unsplash.com/photo-1528698758836-8c4d6226f98d?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Lavanda']
  },
  {
    id: '204',
    title: 'Kit Plantio Dia dos Pais - Raízes Fortes',
    price: 3.70,
    description: 'Homenagem para pais. Design rústico ou moderno (azul/verde). Uma lembrança que cresce e fortalece os laços, assim como o amor de pai.',
    imageUrl: 'https://images.unsplash.com/photo-1453955992523-22dc237435f3?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Pimenta', 'Manjericão']
  },
  {
    id: '205',
    title: 'Lembrancinha Festa Junina - Sementes do Arraiá',
    price: 3.70,
    description: 'Óia a chuva! É mentira, é chuva de sementes! Arte xadrez com girassol ou milho. A prenda perfeita para o seu São João.',
    imageUrl: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Milho', 'Hortaliças']
  },
  {
    id: '206',
    title: 'Kit Plantio Carnaval - Bloco da Natureza',
    price: 3.70,
    description: 'Alegria e cores! Brinde sustentável para pular o carnaval consciente. Embalagem vibrante com confetes coloridos na arte.',
    imageUrl: 'https://images.unsplash.com/photo-1517260485906-8d5f47494511?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '207',
    title: 'Lembrancinha de Natal Corporativo - Boas Festas',
    price: 3.70,
    description: 'Finalize o ano plantando esperança. Kit perfeito com arte natalina (vermelho/dourado) para presentear colaboradores e clientes no Natal.',
    imageUrl: 'https://images.unsplash.com/photo-1544979590-2c3584995f99?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Pinheiro (Tuia)', 'Hortaliças']
  },
  {
    id: '208',
    title: 'Kit Plantio Dia dos Professores - Mestre',
    price: 3.70,
    description: '"Quem planta conhecimento, colhe futuro". A homenagem perfeita e simbólica para educadores. Arte com coruja ou maçã.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '209',
    title: 'Lembrancinha de Batizado - Anjo da Guarda',
    price: 3.70,
    description: 'Delicadeza e pureza. Kit plantio com arte de anjinho ou pombinha branca. Memória viva deste momento sagrado para padrinhos e convidados.',
    imageUrl: 'https://images.unsplash.com/photo-1519750292352-c9fc173d2a61?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Margarida', 'Camomila', 'Girassol']
  },
  {
    id: '210',
    title: 'Lembrancinha 15 Anos - Debutante',
    price: 3.70,
    description: 'Moderno e sofisticado. Personalize com a paleta de cores da festa de debutante (Rose Gold, Azul Tiffany, etc). Um presente vivo para os convidados.',
    imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '211',
    title: 'Kit Plantio Formatura - Novos Caminhos',
    price: 3.70,
    description: 'O símbolo de um novo ciclo que se inicia. Arte com capelo e diploma. Ideal para colação de grau e festas de formatura (ABC, Faculdade).',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Trevo de 4 Folhas', 'Hortaliças']
  },
  {
    id: '212',
    title: 'Lembrancinha Maternidade - Cheguei',
    price: 3.70,
    description: 'Para celebrar o nascimento. Arte delicada com nome do bebê, pezinhos ou cegonha. Uma lembrança que as visitas vão cultivar com carinho.',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Camomila', 'Margarida']
  },
  {
    id: '213',
    title: 'Lembrancinha Chá de Bebê / Revelação',
    price: 3.70,
    description: 'O amor está crescendo! Ideal para brincadeiras e lembrancinhas de Chá de Fraldas. Opções de arte neutra, azul ou rosa.',
    imageUrl: 'https://images.unsplash.com/photo-1510018572596-e40e2619b412?q=80&w=800&auto=format&fit=crop',
    category: 'Datas Comemorativas',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },

  // --- NOVOS EVENTOS CORPORATIVOS (SEO OTIMIZADO) ---
  
  {
    id: '301',
    title: 'Brinde Dia do Cliente - Mimo Corporativo',
    price: 3.70,
    description: 'Valorize quem move seu negócio! Kit plantio personalizado para o Dia do Cliente. Um presente vivo que fortalece parcerias e fideliza com sustentabilidade.',
    imageUrl: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800&auto=format&fit=crop',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Trevo de 4 Folhas']
  },
  {
    id: '302',
    title: 'Lembrancinha Dia do Trabalhador - 1º de Maio',
    price: 3.70,
    description: 'Reconhecimento que cresce. Homenageie seus colaboradores com um kit de plantio ecológico. Personalize com a logo da empresa e uma mensagem de gratidão.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Hortaliças', 'Margarida']
  },
  {
    id: '303',
    title: 'Kit Plantio Feliz Ano Novo - Renova',
    price: 3.70,
    description: 'Desejos de prosperidade e renovação! Brinde de fim de ano com sementes de girassol ou trevo. A melhor forma de começar 2025 plantando boas energias.',
    imageUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?q=80&w=800&auto=format&fit=crop',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Trevo de 4 Folhas', 'Lentilha']
  },
  {
    id: '304',
    title: 'Brinde Corporativo Boas Festas - Natal',
    price: 3.70,
    description: 'Celebre as conquistas do ano! Lembrancinha ecológica para clientes e funcionários. Embalagem festiva personalizada com "Boas Festas" e sua marca.',
    imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=800&auto=format&fit=crop',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Pinheiro (Tuia)', 'Girassol', 'Hortaliças']
  },
  {
    id: '305',
    title: 'Brinde para SIPAT - Segurança e Vida',
    price: 3.70,
    description: '"Segurança se cultiva dia a dia". O brinde ideal para sua SIPAT. Kit plantio que reforça a mensagem de cuidado, vida e proteção no ambiente de trabalho.',
    imageUrl: 'https://images.unsplash.com/photo-1629814596131-0c5a242c2c01?q=80&w=800&auto=format&fit=crop',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '306',
    title: 'Lembrancinha Dia da Mulher - Março',
    price: 3.70,
    description: 'Delicadeza e força. Homenagem especial para o Mês da Mulher. Kit com sementes de flores (Margarida/Girassol) e arte personalizada exaltando o empoderamento feminino.',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=800&auto=format&fit=crop',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Margarida', 'Girassol', 'Violeta']
  },
  {
    id: '307',
    title: 'Kit Educação Ambiental e ESG',
    price: 3.70,
    description: 'Ações de sustentabilidade e ESG na prática. Kit didático para workshops, semanas do meio ambiente e ações de conscientização ecológica na empresa.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    category: 'Eventos Corporativos',
    minOrder: 30,
    availableSeeds: ['Árvore Nativa', 'Girassol', 'Hortaliças']
  },

  // --- TEMAS INFANTIS (ANTERIORES) ---
  
  {
    id: '101',
    title: 'Lembrancinha Kit Plantio Tema Piquenique',
    price: 3.70,
    description: 'Perfeito para festas ao ar livre! Lembrancinha ecológica personalizada com estampa xadrez vermelha e elementos de piquenique (cestinha, frutas). Um charme para celebrar a natureza.',
    imageUrl: 'https://images.unsplash.com/photo-1596541223844-3112a2024b45?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '102',
    title: 'Kit Plantio Tema Floresta Encantada',
    price: 3.70,
    description: 'Traga a magia da floresta para sua festa. Personalização com cogumelos, duendes e árvores mágicas. Ideal para temas lúdicos e contos de fadas.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '103',
    title: 'Lembrancinha Ecológica Tema Jardim Encantado',
    price: 3.70,
    description: 'Delicadeza em cada detalhe. Tema Jardim Encantado com passarinhos, gaiolinhas e muitas flores em tons pastéis. A lembrancinha perfeita para 1 aninho.',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Camomila']
  },
  {
    id: '104',
    title: 'Kit Plantio Tema Bosque Encantado',
    price: 3.70,
    description: 'Estilo rústico e fofo. Animais do bosque (raposa, guaxinim, cervo) em aquarela. Ideal para festas com decoração em madeira e tons terrosos.',
    imageUrl: 'https://images.unsplash.com/photo-1544967082-d9d3f02b1eb0?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '105',
    title: 'Lembrancinha Tema Primeira Volta ao Sol',
    price: 3.70,
    description: 'Celebre o primeiro aninho com muito sol e alegria! Arte personalizada com solzinho e tons de amarelo e laranja. O kit Girassol é o favorito para este tema.',
    imageUrl: 'https://i.ibb.co/LdGhzVLH/lembrancinha-primeira-volta-ao-sol.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '106',
    title: 'Kit Plantio Tema Jardim das Borboletas',
    price: 3.70,
    description: 'Para voar alto! Personalização encantadora com diversas borboletas coloridas. Uma lembrancinha que simboliza transformação e beleza.',
    imageUrl: 'https://images.unsplash.com/photo-1473615174008-0428d052826e?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '107',
    title: 'Lembrancinha Personalizada Tema Moana',
    price: 3.70,
    description: 'O chamado do mar! Arte tropical com elementos da Moana, flores de hibisco e ondas. Perfeito para festas na praia ou piscina.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '108',
    title: 'Kit Plantio Tema Mickey e Minnie',
    price: 3.70,
    description: 'O clássico que nunca sai de moda. Cores vermelho, preto e amarelo com as orelhinhas mais famosas do mundo. Sucesso garantido entre meninos e meninas.',
    imageUrl: 'https://i.ibb.co/prnvXBLB/Whats-App-Image-2025-12-04-at-10-40-32-1.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '109',
    title: 'Lembrancinha Ecológica Tema Safari',
    price: 3.70,
    description: 'Aventura na selva! Leão, girafa, elefante e zebra em uma arte vibrante. O kit mais pedido para festas de meninos aventureiros.',
    imageUrl: 'https://i.ibb.co/x8Rq4mxR/Whats-App-Image-2025-12-04-at-11-02-53-2.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '110',
    title: 'Kit Plantio Tema Safari Baby',
    price: 3.70,
    description: 'Versão cute e delicada do Safari, com bichinhos bebês e tons suaves (verde menta, bege). Ideal para chás de bebê e aniversários de 1 a 3 anos.',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '111',
    title: 'Lembrancinha Tema Fadinha',
    price: 3.70,
    description: 'Pó de pirlimpimpim! Tema mágico com silhuetas de fadas, varinhas e brilhos. Uma lembrancinha etérea para festas delicadas.',
    imageUrl: 'https://images.unsplash.com/photo-1520281682390-e79430c4e420?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Margarida', 'Camomila', 'Girassol']
  },
  {
    id: '112',
    title: 'Kit Plantio Tema Bailarina',
    price: 3.70,
    description: 'Muita elegância e cor de rosa. Personalizado com sapatilhas e bailarinas. Ideal para pequenas dançarinas.',
    imageUrl: 'https://images.unsplash.com/photo-1549488347-194121404c99?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '113',
    title: 'Lembrancinha Tema Hot Wheels / Carros',
    price: 3.70,
    description: 'Acelerando na diversão! Arte radical com pistas, bandeiras quadriculadas e carros velozes. Para festas cheias de adrenalina.',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '114',
    title: 'Kit Plantio Tema Turma da Mônica',
    price: 3.70,
    description: 'O bairro do Limoeiro na sua festa! Mônica, Cebolinha, Cascão e Magali em artes divertidas e coloridas. Um clássico brasileiro.',
    imageUrl: 'https://i.ibb.co/FLmqdbd8/Whats-App-Image-2025-12-04-at-11-02-53-1.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '115',
    title: 'Lembrancinha Personalizada Tema Lilo e Stitch',
    price: 3.70,
    description: 'Ohana quer dizer família. Tema tropical azul e divertido com o alienígena mais amado. Ótimo para festas estilo luau.',
    imageUrl: 'https://images.unsplash.com/photo-1616036737222-777e4878a9c8?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '116',
    title: 'Kit Plantio Tema Galinha Pintadinha',
    price: 3.70,
    description: 'Pó pó pó! O tema favorito dos bebês. Arte azul com bolinhas brancas e a turma do galinheiro. Sucesso no primeiro aninho.',
    imageUrl: 'https://images.unsplash.com/photo-1582234033059-c889f03187c3?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '117',
    title: 'Lembrancinha Tema Bluey',
    price: 3.70,
    description: 'Para a vida real! Tema da família de cachorrinhos Bluey e Bingo. Cores alegres e design moderno que as crianças adoram.',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '118',
    title: 'Kit Plantio Tema Cowboy / Sertanejo',
    price: 3.70,
    description: 'Segura peão! Tema fazenda, cavalo e cowboy. Arte rústica com textura de madeira e corda. Ideal para festas country.',
    imageUrl: 'https://images.unsplash.com/photo-1534078362425-387ae9668c17?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '119',
    title: 'Lembrancinha Tema Frozen',
    price: 3.70,
    description: 'Uma aventura congelante! Tons de azul gelo, flocos de neve e muito brilho. As princesas Elsa e Anna para uma festa real.',
    imageUrl: 'https://images.unsplash.com/photo-1528696892704-5e1122852276?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '120',
    title: 'Kit Plantio Tema Encanto Mirabel',
    price: 3.70,
    description: 'Colorido e vibrante como a Colômbia! Muitas flores, borboletas e cores fortes inspiradas na Família Madrigal.',
    imageUrl: 'https://images.unsplash.com/photo-1550592983-938b81335b24?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '121',
    title: 'Lembrancinha Tema Princesas Disney',
    price: 3.70,
    description: 'Para um dia de realeza. Cinderela, Branca de Neve, Bela... Escolha sua princesa favorita ou faça um mix real para sua festa.',
    imageUrl: 'https://i.ibb.co/fhqPfFN/Lembrancinha-tema-princesa.jpg',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Margarida', 'Hortaliças']
  },
  {
    id: '122',
    title: 'Kit Plantio Tema Mundo Bita',
    price: 3.70,
    description: 'Bom dia, o sol já nasceu lá na fazendinha! O bigodudo mais amado em uma arte cheia de imaginação e música.',
    imageUrl: 'https://images.unsplash.com/photo-1519890664627-75e183786016?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '123',
    title: 'Lembrancinha Tema Pokémon',
    price: 3.70,
    description: 'Temos que pegar! Pikachu e amigos em uma lembrancinha eletrizante. Cores vibrantes (amarelo, vermelho) para mestres Pokémon.',
    imageUrl: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '124',
    title: 'Kit Plantio Tema Roblox',
    price: 3.70,
    description: 'O universo dos games na sua festa. Arte pixelada e moderna inspirada nos avatares e mundos do Roblox.',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '125',
    title: 'Lembrancinha Tema Minecraft',
    price: 3.70,
    description: 'Construa memórias! Blocos verdes e marrons (Terra e Grama) que combinam perfeitamente com o kit de plantio.',
    imageUrl: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  },
  {
    id: '126',
    title: 'Kit Plantio Tema Pocoyo',
    price: 3.70,
    description: 'Simples e divertido. Fundo branco com Pocoyo, Pato e Elly. Cores primárias vibrantes para festas de 1 a 2 anos.',
    imageUrl: 'https://images.unsplash.com/photo-1558280417-ea782f829e93?q=80&w=800&auto=format&fit=crop',
    category: 'Aniversários Infantis',
    minOrder: 30,
    availableSeeds: ['Girassol', 'Tomate Cereja', 'Hortaliças']
  }
];

export const GALLERY_IMAGES = [
    { id: 9, title: 'Tema Times de Futebol', category: 'Infantil', url: 'https://i.ibb.co/WpV7tZ6j/Whats-App-Image-2025-12-04-at-11-02-51-2.jpg' },
    { id: 7, title: 'Tema Super Mario Bros', category: 'Infantil', url: 'https://i.ibb.co/pvWwVVtL/Whats-App-Image-2025-12-04-at-11-02-48-1.jpg' },
    { id: 8, title: 'Tema Video Game', category: 'Infantil', url: 'https://i.ibb.co/4w6XLh14/Whats-App-Image-2025-12-04-at-11-02-49-1.jpg' },
    { id: 1, title: 'Tema Fazendinha', category: 'Infantil', url: 'https://i.ibb.co/p6kqjCQK/Whats-App-Image-2025-12-04-at-10-40-33.jpg' },
    { id: 2, title: 'Identidade Corporativa', category: 'Empresarial', url: 'https://i.ibb.co/BVvbCkDg/Whats-App-Image-2025-12-04-at-10-40-32.jpg' },
    { id: 3, title: 'Tema Safari Baby', category: 'Infantil', url: 'https://i.ibb.co/x8Rq4mxR/Whats-App-Image-2025-12-04-at-11-02-53-2.jpg' },
    { id: 4, title: 'Turma da Mônica', category: 'Infantil', url: 'https://i.ibb.co/FLmqdbd8/Whats-App-Image-2025-12-04-at-11-02-53-1.jpg' },
    { id: 5, title: 'Tema Primeira volta ao sol', category: 'Aniversário', url: 'https://i.ibb.co/LdGhzVLH/lembrancinha-primeira-volta-ao-sol.jpg' },
    { id: 6, title: 'Tema princesas', category: 'Infantil', url: 'https://i.ibb.co/fhqPfFN/Lembrancinha-tema-princesa.jpg' },
];

export const REELS_VIDEOS = [
  {
    id: 1,
    title: 'Germinando Alegria',
    url: 'https://www.dropbox.com/scl/fi/mutzdu7kxtba4t4bx29zr/Todo-feliz-que-sua-lembrancinha-est-germinando-na-casa-dos-amigos-lembrancinhacomproposito.mp4?rlkey=95lyn35cdwlu4lnbi61qa5buf&st=dztpinwm&raw=1',
    thumbnail: 'https://images.pexels.com/photos/7650692/pexels-photo-7650692.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    title: 'Tema Pantera Negra',
    url: 'https://www.dropbox.com/scl/fi/dj79r7ga4lmhz0kwljtee/Pantera-Negra-reinou-nesse-final-de-semana-....-panteranegra-wakanda-lembrancaspersonalizadas.mp4?rlkey=jnhg5dpjwd8vxeak6wi6fdw5c&st=3aabnpqn&raw=1',
    thumbnail: 'https://images.pexels.com/photos/4440866/pexels-photo-4440866.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: 'Processo Perfeito',
    url: 'https://www.dropbox.com/scl/fi/h55urq97hrolr67c2nelc/S-o-v-rias-etapas-mas-ao-final-o-resultado-perfeito-.-.-.-Enviamos-para-todo-Brasil.mp4?rlkey=bvtf3b0tsndocww59rsr7hm6m&st=ko76tu35&raw=1',
    thumbnail: 'https://images.pexels.com/photos/5645604/pexels-photo-5645604.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    title: 'Entrada da Primavera',
    url: 'https://www.dropbox.com/scl/fi/esk2xnk9d6uf54sk6wep0/tbt-de-uma-linda-tarde-em-comemora-o-a-entrada-da-primavera.mp4?rlkey=aehuv1fs5qycc7zmksvww7r1s&st=ikgycs7h&raw=1',
    thumbnail: 'https://images.pexels.com/photos/5976694/pexels-photo-5976694.jpeg'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  // Top com Imagens Personalizadas
  {
    id: '1',
    name: 'Marielle Miranda',
    role: 'Aniversário Infantil',
    content: 'Que maravilhoso foi ter encontrado essa loja, a vendedora muito prestativa e resolutiva nas questões propostas. Tudo veio bem embalado e sem danos! Os convidados amaram, meu filho aniversariante e eu tbm 🙂',
    rating: 5,
    imageUrl: 'https://i.ibb.co/TD8Mjwhr/Marielle-Miranda.jpg',
    productImageUrl: 'https://i.ibb.co/Y4LzLrDx/Whats-App-Image-2025-12-04-at-10-39-08.jpg'
  },
  {
    id: '2',
    name: 'Danilo Peterson',
    role: 'Cliente Verificado',
    content: 'Desde antes de efetuar a compra a Leona sanou todas nossas dúvidas sobre os kits e personalização. Deixando todo o processo muito transparente. A entrega foi dentro do prazo.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/vCXHQrxB/Danilo-Peterson-Monteiro-Cabrelli.webp',
    productImageUrl: 'https://i.ibb.co/rGtHV51M/Whats-App-Image-2025-12-04-at-11-02-52-2.jpg'
  },
  {
    id: '3',
    name: 'Ligia Porto',
    role: 'Kit Tomate Cereja',
    content: 'Trabalho muito rápido, vendedora atenciosa e as lembrancinhas vieram lindas e bem embaladas. Ansiosa para ver os pézinhos de tomate cereja crescendo! Muito obrigada!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/4ZdCHDhc/Ligia-Porto.webp',
    productImageUrl: 'https://i.ibb.co/840jmjht/Whats-App-Image-2025-12-04-at-11-02-50-2.jpg'
  },
  {
    id: '4',
    name: 'Helena Malvezzi',
    role: 'Lembrancinha Personalizada',
    content: 'Muito bonitinho o kit. Leona super atenciosa com a qualidade da imagem e com o que gostaríamos de ter desenhado. Podem comprar que vale a pena!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/VYkBGdPr/Helena-Malvezzi.jpg'
  },

  // Novos Depoimentos Reais com Fotos
  {
    id: '30',
    name: 'Patrícia Mesquita',
    role: 'Recomendação',
    content: 'A lembrancinha é linda! Os convidados adoraram! Recomendo.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/RrfqZZt/Patricia-Mesquita.jpg'
  },
  {
    id: '31',
    name: 'Alexandra Priscilla',
    role: 'Cliente Satisfeita',
    content: 'Lindo exatamente o que queria.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/Sj457kg/Alexandra-Priscila.jpg'
  },
  {
    id: '32',
    name: 'Suellen Machado',
    role: 'Entrega Rápida',
    content: 'Chegou bem rapidinho, o personalizado é bem feito e a vendedora muito atenciosa.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/TMDLqQmH/Suellem-Azevedo.webp'
  },
  {
    id: '33',
    name: 'Cindia Azeredo',
    role: 'Custo-Benefício',
    content: 'A Leona foi muito atenciosa, o produto tem um bom custo-benefício. Chegou bem embalado e rápido.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/QFmMZ2mP/Cindia-Azevedo.webp'
  },
  {
    id: '11',
    name: 'Heloisa Rocha Lopes da Silva',
    role: 'Cliente Encantada',
    content: 'Gostaria de agradecer imensamente a Leona. Além de ter me atendido com muita rapidez, foi de uma educação, cordialidade, presteza e cuidado difíceis de se encontrar hoje em dia. Além disso o produto é maravilhoso! Chegou muito bem embalado.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/6R68Bj0G/Heloisa-Rocha-Lopes-da-Silva.webp'
  },
  {
    id: '12',
    name: 'Alinie Barrios',
    role: 'Pedido Urgente',
    content: 'Muito satisfeita! Atendimento impecável, objetiva e ágil sem deixar de ser atenciosa. Lembrancinhas chegaram com a antecedência que eu precisava, bem embaladas e lindas! Super recomendo!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/YM2tjZ6/Alinie-Barrios.webp'
  },
  {
    id: '13',
    name: 'Jessica Chaves',
    role: 'Cliente Satisfeita',
    content: 'Muito bom, tanto o atendimento quanto a entrega, sem contar que ficou muito fofo.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/p6CZDSP5/Jessica-Chaves.webp'
  },
  {
    id: '14',
    name: 'Juliana Tavelini Scalon',
    role: 'Festa Infantil',
    content: 'Responde rápido. Atenciosa. Produto de qualidade, as crianças adoraram.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/Q77S4y6M/Juliana-Scalon.webp'
  },
  {
    id: '15',
    name: 'Kathleen Birnkott Carvalho',
    role: 'Compra Verificada',
    content: 'Chegou tudo lindo. Bem rápido. Leona foi super prestativa e querida.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/yByvj2vS/Kathleen-Birnkott-Carvalho.webp'
  },
  {
    id: '16',
    name: 'Renata Velame',
    role: 'Cliente Satisfeita',
    content: 'Tudo maravilhoso e super rápido! Amei',
    rating: 5,
    imageUrl: 'https://i.ibb.co/k2rKqfBB/Renata-velame.webp'
  },
  {
    id: '17',
    name: 'Heloiza da Silva',
    role: 'Recomenda',
    content: 'As lembrancinhas ficaram lindas. E a entrega foi super rápida. Recomendo.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/3mgMKCJH/Heloiza-da-Silva.jpg'
  },
  {
    id: '18',
    name: 'Raquel Moritz',
    role: 'Cliente Satisfeita',
    content: 'O produto ficou lindo, a Leona foi muito prestativa, flexível e rápida em atender o prazo. Compraria de novo com certeza.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/4RcNPxFD/Raquel-Moritz.webp'
  },
  {
    id: '19',
    name: 'Lívia Monteiro',
    role: 'Compra Verificada',
    content: 'Produto chegou direitinho. Fiquei muito satisfeita. Vendedora muito atenciosa.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/sdg06Fpm/L-via-Monteiro.webp'
  },
  {
    id: '20',
    name: 'Eduarda Pimentel',
    role: 'Qualidade Garantida',
    content: 'Produto de ótima qualidade! Leona super atenciosa. Recomendo',
    rating: 5,
    imageUrl: 'https://i.ibb.co/FkWF1V9G/Eduarda-Pimentel.webp'
  },
  {
    id: '21',
    name: 'Michele Moreira de Lima Gomes',
    role: 'Cliente Recorrente',
    content: 'Já é o segundo ano que compro a lembrança! Ela sempre faz sucesso! Leona, agradeço o carinho e atenção! Obrigada mais uma vez!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/gsSch9T/MICHELE-MOREIRA-DE-LIMA-GOMES.webp'
  },
  {
    id: '34',
    name: 'Acacef',
    role: 'Institucional',
    content: 'As lembrancinhas são excelentes, e o atendimento também! Muito obrigada 🙂',
    rating: 5,
    imageUrl: 'https://i.ibb.co/bV1r7Md/ACACEF.webp'
  },
  {
    id: '22',
    name: 'Carolina Moriyama',
    role: 'Cliente Satisfeita',
    content: 'Gostei muito! Ótimo atendimento pelo chat.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/60fwB2F4/Carolina-Moriyama.jpg'
  },
  {
    id: '23',
    name: 'Priscilla Rodrigues',
    role: 'Compra Verificada',
    content: 'Material de qualidade, fácil comunicação com a empresa',
    rating: 5,
    imageUrl: 'https://i.ibb.co/4ZkpvNb0/Priscilla-Rodrigues.jpg'
  },
  {
    id: '24',
    name: 'Helena Barbosa',
    role: 'Entrega Rápida',
    content: 'É muito bonitinho, eu tinha pressa e fui super bem atendida, chegou até antes do esperado',
    rating: 5,
    imageUrl: 'https://i.ibb.co/00gYSx9/Helena-Barbosa.webp'
  },
  {
    id: '35',
    name: 'Flavia Mattos',
    role: 'Recomenda',
    content: 'Amei, compraria novamente, super recomendo !',
    rating: 5,
    imageUrl: 'https://i.ibb.co/39Q9Zd3r/Flavia-Mattos-de-Assis.webp'
  },
  {
    id: '25',
    name: 'Maria Castanheiras',
    role: 'Cliente Satisfeita',
    content: 'Tudo lindo, chegou dentro do prazo. Só tenho a agradecer o atendimento e o produto de ótima qualidade.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/FRrG294/Maria-de-Bel-m-Castanheira.webp'
  },
  {
    id: '26',
    name: 'Tatiane Brito',
    role: 'Cliente Encantada',
    content: 'Perfeito demais! Além do ótimo atendimento, fiquei encantada com o trabalho !!! Show!!!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/YBGCTY28/Tatiane-de-Oliveira-Silva-e-Brito.jpg'
  },
  {
    id: '27',
    name: 'Jaice Mary de Oliveira',
    role: 'Cliente Satisfeita',
    content: 'Entrega rápida, vendedora cordial, feliz com minha compra',
    rating: 5,
    imageUrl: 'https://i.ibb.co/ds843JNx/Jaice-Mary-de-Oliveira.webp'
  },
  {
    id: '28',
    name: 'Samanntha Rocha Pinto',
    role: 'Superou Expectativas',
    content: 'Vendedora super atenciosa e caprichosa! Envio rápido! Superou minhas expectativas!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/WWXspp8D/Samanntha-Rocha-Pinto.webp'
  },
  {
    id: '29',
    name: 'Ana Laval',
    role: 'Apaixonada',
    content: 'Que delicadeza! Que lindo... eu amei',
    rating: 5,
    imageUrl: 'https://i.ibb.co/VpcfhfHh/Ana-Laval.webp'
  },
  {
    id: '40',
    name: 'Thais Micucci',
    role: 'Arte Personalizada',
    content: 'Muito capricho e chegou rapidinho! Mandei a arte e fizeram exatamente igual ao convite.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/1tWPMW3X/Thais-Micucci.jpg'
  },
  {
    id: '41',
    name: 'Luisa Bonfioli',
    role: 'Entrega no Prazo',
    content: 'Perfeito! Chegou dentro do prazo. E veio como eu imaginava. Amei!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/0jzZ35Ln/Luisa-Bonfioli.jpg'
  },
  {
    id: '42',
    name: 'Paola Goussain',
    role: 'Cliente Recorrente',
    content: 'Que lembrancinhas mais lindas! Com certeza, comprarei novamente. Muito obrigada pelo cuidado e carinho para com meu pedido!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/fzfzVXrT/Paola-Goussain.jpg'
  },
  {
    id: '43',
    name: 'Lucilene Raab',
    role: 'Compra Verificada',
    content: 'O produto é lindo e delicado. O atendimento e envio foi super rápido. Recomendo demais!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/sv4HZhbf/Lucilene-Raab.webp'
  },
  {
    id: '44',
    name: 'Ketlin dos Santos Gúntzel',
    role: 'Entrega Rápida',
    content: 'Super indico compraram, lindo, veio do jeito que eu pedi. Chegou antes do prazo',
    rating: 5,
    imageUrl: 'https://i.ibb.co/YBGCFZg9/Ketlin-dos-Santos-G-ntzel.jpg'
  },
  {
    id: '45',
    name: 'Viviane Alonso',
    role: 'Aniversário',
    content: 'Lindos vasinhos e a embalagem com o nome e o tema de aniversario, ficou perfeito!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/8nZNMxDj/Viviane-Alonso.jpg'
  },
  {
    id: '46',
    name: 'Analu Murari',
    role: 'Atendimento Top',
    content: 'Vendedor super atencioso, me deu todo o suporte e fez que minha encomenda chegasse antes do esperado. Tudo de bom!!! Mto lindo',
    rating: 5,
    imageUrl: 'https://i.ibb.co/0p8MyBKd/Analu-Murari.jpg'
  },
  {
    id: '47',
    name: 'Dalene Santos',
    role: 'Lembrancinha',
    content: 'Adorei... Um mimo super fofo... Espero que os convidados cuidem e adornem suas casas.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/3y7qTtxG/Dalene-Santos.webp'
  },
  {
    id: '48',
    name: 'Maria Moquiche',
    role: 'Arte Própria',
    content: 'Adorei os vasinhos e a embalagem com a arte que eu enviei! Ficaram fofos e a entrega foi bem rápida!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/Kjvk0cJ5/Maria-Moquiche.jpg'
  },
  {
    id: '49',
    name: 'Carol Ventura',
    role: 'Compra Verificada',
    content: 'Vendedora super atenciosa! Produto de acordo com a descrição do anúncio',
    rating: 5,
    imageUrl: 'https://i.ibb.co/G3HpwMNV/Carol-Ventura.jpg'
  },
  {
    id: '50',
    name: 'Lais Domingues Xavier',
    role: 'Recomendação',
    content: 'Amei! Uma graça e super rápido o envio. Atenção da vendedora e cuidado com o produto. Recomendo :)',
    rating: 5,
    imageUrl: 'https://i.ibb.co/j98mM7RL/Lais-Domingues-Xavier.webp'
  },
  {
    id: '51',
    name: 'Patrícia Ramos',
    role: 'Entrega Antecipada',
    content: 'Tudo certinho. Lindinho. Atendimento super atencioso. Entrega muito antes do programado.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/F4ztpRg4/Patr-cia-Ramos.webp'
  },
  {
    id: '52',
    name: 'TALITA MENESES BAÚ',
    role: 'Salvação de Festa',
    content: 'Vendedora super atenciosa Me socorreu e mandou o produto antes do prazo ! Super recomendo',
    rating: 5,
    imageUrl: 'https://i.ibb.co/jPRCMrQk/TALITA-MENESES-BA.jpg'
  },
  {
    id: '53',
    name: 'Fabiana de Souza Espindola',
    role: 'Cliente Satisfeita',
    content: 'Muito capricho, atendimento perfeito, cuidado com o produto e dentro do prazo. Parabéns.',
    rating: 5,
    imageUrl: 'https://i.ibb.co/fYfPkP79/Fabiana-de-Souza-Espindola.webp'
  },
  {
    id: '54',
    name: 'Carla de Paula Souza Milioni',
    role: 'Recomendação',
    content: 'As lembrancinhas são maravilhosas!! Exatamente como esperado!! Gostei demais! Recomendo!!',
    rating: 5,
    imageUrl: 'https://i.ibb.co/ZzrhxCXW/Carla-de-Paula-Souza-Milioni.jpg'
  }
];

export const CATEGORIES = ['Todos', 'Datas Comemorativas', 'Datas Ambientais', 'Aniversários Infantis', 'Eventos Corporativos'];

// --- Admin Mock Data ---

export const MOCK_ORDERS: Order[] = [
  { 
    id: '#ORD-7829', 
    customerName: 'Juliana Costa', 
    customerEmail: 'ju.costa@email.com', 
    date: '2024-05-10', 
    status: 'delivered', 
    total: 450.00, 
    itemsCount: 100, 
    paymentMethod: 'PIX', 
    blingStatus: 'synced', 
    blingId: '15920',
    shippingService: 'Correios - PAC',
    trackingCode: 'OK123456789BR',
    labelGenerated: true,
    address: { street: 'Rua das Magnólias', number: '120', neighborhood: 'Jardim Florido', city: 'São Paulo', state: 'SP', zipCode: '01234-567' },
    hasTestimonial: true
  },
  { 
    id: '#ORD-7830', 
    customerName: 'Empresa Tech Solutions', 
    customerEmail: 'compras@techsol.com', 
    date: '2024-05-11', 
    status: 'shipped', 
    total: 1200.50, 
    itemsCount: 300, 
    paymentMethod: 'Boleto', 
    blingStatus: 'synced', 
    blingId: '15921',
    shippingService: 'Jadlog - .Package',
    trackingCode: '100820030040',
    labelGenerated: true,
    address: { street: 'Av. Paulista', number: '1000', complement: 'Andar 15', neighborhood: 'Bela Vista', city: 'São Paulo', state: 'SP', zipCode: '01310-100' },
    hasTestimonial: false
  },
  { 
    id: '#ORD-7831', 
    customerName: 'Escola Pequeno Príncipe', 
    customerEmail: 'financeiro@pequenoprincipe.com', 
    date: '2024-05-12', 
    status: 'production', 
    total: 185.00, 
    itemsCount: 50, 
    paymentMethod: 'Cartão', 
    blingStatus: 'pending',
    address: { street: 'Rua da Alegria', number: '50', neighborhood: 'Centro', city: 'Campinas', state: 'SP', zipCode: '13010-000' },
    hasTestimonial: false
  },
  { 
    id: '#ORD-7832', 
    customerName: 'Ana e Pedro Casamento', 
    customerEmail: 'anaepedro@email.com', 
    date: '2024-05-12', 
    status: 'paid', 
    total: 890.00, 
    itemsCount: 200, 
    paymentMethod: 'PIX', 
    blingStatus: 'pending',
    address: { street: 'Alameda dos Anjos', number: '77', neighborhood: 'Vila Olímpia', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22000-000' },
    hasTestimonial: false
  },
  { 
    id: '#ORD-7833', 
    customerName: 'Roberto Almeida', 
    customerEmail: 'beto@email.com', 
    date: '2024-05-13', 
    status: 'pending', 
    total: 111.00, 
    itemsCount: 30, 
    paymentMethod: 'Cartão', 
    blingStatus: 'pending',
    address: { street: 'Rua XV de Novembro', number: '800', neighborhood: 'Centro', city: 'Curitiba', state: 'PR', zipCode: '80020-000' },
    hasTestimonial: false
  },
  // Pedido para teste do usuário Google
  { 
    id: '#ORD-9901', 
    customerName: 'Usuário Google', 
    customerEmail: 'usuario.google@gmail.com', 
    date: '2024-05-20', 
    status: 'production', 
    total: 370.00, 
    itemsCount: 100, 
    paymentMethod: 'PIX', 
    blingStatus: 'pending',
    address: { street: 'Rua Vinicius de Moraes', number: '80', neighborhood: 'Pontal de Camburi', city: 'Vitória', state: 'ES', zipCode: '29000-000' },
    hasTestimonial: false
  },
];

export const MOCK_MESSAGES: ContactMessage[] = [
  { id: '1', name: 'Carla Dias', email: 'carla@exemplo.com', subject: 'Dúvida sobre personalização', message: 'Olá, gostaria de saber se é possível colocar o logo da minha empresa colorido na tag kraft?', date: '2024-05-12 14:30', read: false },
  { id: '2', name: 'Marcos Vinicius', email: 'marcos@exemplo.com', subject: 'Prazo de entrega para SP', message: 'Preciso de 500 unidades para o dia 20. Dá tempo de produzir?', date: '2024-05-11 09:15', read: true },
  { id: '3', name: 'Julia Roberts', email: 'julia@exemplo.com', subject: 'Parceria', message: 'Sou cerimonialista e gostaria de conhecer seus preços para revenda.', date: '2024-05-10 18:00', read: true },
];
