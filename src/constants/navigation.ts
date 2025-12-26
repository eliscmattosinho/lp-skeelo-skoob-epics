interface NavigationItem {
    readonly label: string;
    readonly href: string;
    readonly children?: readonly NavigationItem[];
}

export const contextNav: readonly NavigationItem[] = [
    {
        label: "Sobre",
        href: "",
        children: [
            { label: "Contexto", href: "#contexto" },
            { label: "Elementos", href: "#elementos" },
        ],
    },
    { label: "Skeelo", href: "#skeelo" },
    { label: "Skoob", href: "#skoob" },
    { label: "Contato", href: "#contato" },
];
