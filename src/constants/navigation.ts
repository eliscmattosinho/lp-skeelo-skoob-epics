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
            { label: "Contexto", href: "#context" },
            { label: "Elementos", href: "#elements" },
        ],
    },
    { label: "Skeelo", href: "#skeelo" },
    { label: "Skoob", href: "#skoob" },
    { label: "Contato", href: "#contact" },
];
