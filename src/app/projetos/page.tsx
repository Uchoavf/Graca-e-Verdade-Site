import ProjectCard from "@/components/ProjectCard";

export default function Projetos() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Projetos</h1>
      <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
        Alguns trabalhos que desenvolvi ao longo da minha carreira.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {projetos.map((projeto) => (
          <ProjectCard key={projeto.title} {...projeto} />
        ))}
      </div>
    </div>
  );
}

const projetos = [
  {
    title: "Projeto Alpha",
    description: "Plataforma de gestão de tarefas com autenticação, colaboração em tempo real e notificações push.",
    tags: ["React", "Node.js", "Socket.io"],
    link: "https://github.com",
  },
  {
    title: "Site Institucional",
    description: "Site completo para empresa com blog, área de clientes e integração com CRM.",
    tags: ["Next.js", "Tailwind", "Prisma"],
    link: "https://github.com",
  },
  {
    title: "App de Delivery",
    description: "Aplicação mobile-first para pedidos e entregas com rastreamento em tempo real.",
    tags: ["React Native", "Firebase", "Maps API"],
    link: "https://github.com",
  },
  {
    title: "Dashboard Analytics",
    description: "Painel administrativo com gráficos interativos, exportação de relatórios e multi-tenancy.",
    tags: ["React", "D3.js", "PostgreSQL"],
    link: "https://github.com",
  },
];
