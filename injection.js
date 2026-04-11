(function () {
    const presets = {
        "Default Dark": { "--c-57545B": "#2E222A", "--c-716F75": "#352732", "--c-959294": "#8B7485", "--c-AAAAAA": "#D1C2CC", "--c-7F2B3E": "#BA7883", "--c-661B28": "#2A1D25", "--color-text-primary": "#D1C2CC", "--logo-filter": "brightness(0) invert(1)" },
        "Default Light": { "--c-57545B": "#F4EBE3", "--c-716F75": "#EBE0D7", "--c-959294": "#7D6A78", "--c-AAAAAA": "#4A3A43", "--c-7F2B3E": "#A1374F", "--c-661B28": "#E2D3CD", "--color-text-primary": "#1F171A", "--logo-filter": "brightness(0)" },

        "Rose Dust": { "--c-57545B": "#2B1E24", "--c-716F75": "#3A2A31", "--c-959294": "#C48A9A", "--c-AAAAAA": "#F2D5DC", "--c-7F2B3E": "#E07A8C", "--c-661B28": "#2A1A20", "--color-text-primary": "#F2D5DC", "--logo-filter": "brightness(0) invert(1)" },
        "Lavender Mist": { "--c-57545B": "#1F1A2E", "--c-716F75": "#2C2542", "--c-959294": "#B8A9E0", "--c-AAAAAA": "#E6E1FA", "--c-7F2B3E": "#9F8CFF", "--c-661B28": "#19142A", "--color-text-primary": "#F0EDFF", "--logo-filter": "brightness(0) invert(1)" },
        "Sunset Ember": { "--c-57545B": "#2A140F", "--c-716F75": "#3D1F18", "--c-959294": "#FF9A6A", "--c-AAAAAA": "#FFD6C2", "--c-7F2B3E": "#FF6A3D", "--c-661B28": "#26120D", "--color-text-primary": "#FFE9E0", "--logo-filter": "brightness(0) invert(1)" },
        "Arctic Frost": { "--c-57545B": "#0F1A22", "--c-716F75": "#1C2E38", "--c-959294": "#9FD3E6", "--c-AAAAAA": "#DFF6FF", "--c-7F2B3E": "#6CE0FF", "--c-661B28": "#0C161C", "--color-text-primary": "#EFFFFF", "--logo-filter": "brightness(0) invert(1)" },
        "Golden Sand": { "--c-57545B": "#2B2418", "--c-716F75": "#3D3423", "--c-959294": "#D8B86A", "--c-AAAAAA": "#F6E7C1", "--c-7F2B3E": "#F2C94C", "--c-661B28": "#2A2315", "--color-text-primary": "#FFF5D6", "--logo-filter": "brightness(0) invert(1)" },
        "Neon Pulse": { "--c-57545B": "#0A0A12", "--c-716F75": "#141420", "--c-959294": "#00FFC6", "--c-AAAAAA": "#CCFFF3", "--c-7F2B3E": "#FF2E88", "--c-661B28": "#0C0C18", "--color-text-primary": "#FFFFFF", "--logo-filter": "brightness(0) invert(1)" },
        "Cherry Blossom": { "--c-57545B": "#2A1D21", "--c-716F75": "#3B2A2F", "--c-959294": "#F4A6B8", "--c-AAAAAA": "#FFE4EC", "--c-7F2B3E": "#FF7A9E", "--c-661B28": "#27191D", "--color-text-primary": "#FFEAF0", "--logo-filter": "brightness(0) invert(1)" },
        "Emerald Glow": { "--c-57545B": "#0E1F17", "--c-716F75": "#1B3A2B", "--c-959294": "#6BE3A8", "--c-AAAAAA": "#C9F7E3", "--c-7F2B3E": "#2EF0A5", "--c-661B28": "#0F2218", "--color-text-primary": "#E8FFF6", "--logo-filter": "brightness(0) invert(1)" },
        "Crimson Night": { "--c-57545B": "#1A0B0D", "--c-716F75": "#2A1418", "--c-959294": "#D66A75", "--c-AAAAAA": "#F2B6BE", "--c-7F2B3E": "#FF3B4D", "--c-661B28": "#17090B", "--color-text-primary": "#FFE5E8", "--logo-filter": "brightness(0) invert(1)" },

        "Skyline Blue": { "--c-57545B": "#0C1624", "--c-716F75": "#1A2B42", "--c-959294": "#7FB3FF", "--c-AAAAAA": "#D4E6FF", "--c-7F2B3E": "#4DA3FF", "--c-661B28": "#0E1A2E", "--color-text-primary": "#EAF3FF", "--logo-filter": "brightness(0) invert(1)" },
        "Obsidian Core": { "--c-57545B": "#050505", "--c-716F75": "#111111", "--c-959294": "#666666", "--c-AAAAAA": "#CCCCCC", "--c-7F2B3E": "#999999", "--c-661B28": "#0A0A0A", "--color-text-primary": "#F5F5F5", "--logo-filter": "brightness(0) invert(1)" },
        "Peach Cream": { "--c-57545B": "#FFF1E6", "--c-716F75": "#FFE4D6", "--c-959294": "#C58C7B", "--c-AAAAAA": "#4A3B36", "--c-7F2B3E": "#FF9A76", "--c-661B28": "#FAD4C3", "--color-text-primary": "#2A1E1A", "--logo-filter": "brightness(0)" },
        "Mint Breeze": { "--c-57545B": "#EFFFF8", "--c-716F75": "#DFF7EE", "--c-959294": "#5C9B85", "--c-AAAAAA": "#2C4A41", "--c-7F2B3E": "#4CD6A8", "--c-661B28": "#CFF3E5", "--color-text-primary": "#1A2F28", "--logo-filter": "brightness(0)" },

        "Royal Indigo": { "--c-57545B": "#14112A", "--c-716F75": "#221E44", "--c-959294": "#9A8CFF", "--c-AAAAAA": "#D6D1FF", "--c-7F2B3E": "#7B6BFF", "--c-661B28": "#181438", "--color-text-primary": "#F0EEFF", "--logo-filter": "brightness(0) invert(1)" },
        "Solar Flare": { "--c-57545B": "#2A1200", "--c-716F75": "#3D1F00", "--c-959294": "#FFB347", "--c-AAAAAA": "#FFE5B4", "--c-7F2B3E": "#FF7A00", "--c-661B28": "#261100", "--color-text-primary": "#FFF3E0", "--logo-filter": "brightness(0) invert(1)" },
        "Glacier Blue": { "--c-57545B": "#0F1C2B", "--c-716F75": "#1E344A", "--c-959294": "#9FD8FF", "--c-AAAAAA": "#E3F5FF", "--c-7F2B3E": "#63C9FF", "--c-661B28": "#0C1724", "--color-text-primary": "#F0FAFF", "--logo-filter": "brightness(0) invert(1)" },
        "Velvet Wine": { "--c-57545B": "#1A0F14", "--c-716F75": "#2B1A21", "--c-959294": "#C08497", "--c-AAAAAA": "#F2D4DD", "--c-7F2B3E": "#E11D48", "--c-661B28": "#170C11", "--color-text-primary": "#FFEAF0", "--logo-filter": "brightness(0) invert(1)" },

        "Amber Glow": { "--c-57545B": "#2A1A0F", "--c-716F75": "#3B2718", "--c-959294": "#FFB86B", "--c-AAAAAA": "#FFE2B8", "--c-7F2B3E": "#FF9900", "--c-661B28": "#26160C", "--color-text-primary": "#FFF3DA", "--logo-filter": "brightness(0) invert(1)" },
        "Sapphire Night": { "--c-57545B": "#0A1020", "--c-716F75": "#162040", "--c-959294": "#6BA8FF", "--c-AAAAAA": "#CFE2FF", "--c-7F2B3E": "#3A7BFF", "--c-661B28": "#0C1833", "--color-text-primary": "#EAF2FF", "--logo-filter": "brightness(0) invert(1)" },
        "Coral Reef": { "--c-57545B": "#2A1715", "--c-716F75": "#3D2623", "--c-959294": "#FF8C7A", "--c-AAAAAA": "#FFD4CC", "--c-7F2B3E": "#FF5A3D", "--c-661B28": "#261411", "--color-text-primary": "#FFEAE5", "--logo-filter": "brightness(0) invert(1)" },
        "Frosted Glass": { "--c-57545B": "#EAF3F7", "--c-716F75": "#D6E7ED", "--c-959294": "#6A8A99", "--c-AAAAAA": "#2F4A55", "--c-7F2B3E": "#5BC0DE", "--c-661B28": "#CFE3EA", "--color-text-primary": "#1C2F36", "--logo-filter": "brightness(0)" }
        ,
        "Midnight Sapphire": { "--c-57545B": "#0A0F1F", "--c-716F75": "#141C36", "--c-959294": "#5F7BFF", "--c-AAAAAA": "#C9D4FF", "--c-7F2B3E": "#3A57FF", "--c-661B28": "#0C1328", "--color-text-primary": "#EAF0FF", "--logo-filter": "brightness(0) invert(1)" },
        "Deep Ocean": { "--c-57545B": "#02121A", "--c-716F75": "#082430", "--c-959294": "#4CC9F0", "--c-AAAAAA": "#BDEFFF", "--c-7F2B3E": "#00B4D8", "--c-661B28": "#011821", "--color-text-primary": "#E6FAFF", "--logo-filter": "brightness(0) invert(1)" },
        "Forest Night": { "--c-57545B": "#0B1A12", "--c-716F75": "#183323", "--c-959294": "#6EE7B7", "--c-AAAAAA": "#CFFFEA", "--c-7F2B3E": "#34D399", "--c-661B28": "#0D2117", "--color-text-primary": "#E8FFF5", "--logo-filter": "brightness(0) invert(1)" },
        "Burnt Copper": { "--c-57545B": "#2A160F", "--c-716F75": "#3B2318", "--c-959294": "#E07A5F", "--c-AAAAAA": "#FFD2C2", "--c-7F2B3E": "#D65A31", "--c-661B28": "#26130C", "--color-text-primary": "#FFEAE3", "--logo-filter": "brightness(0) invert(1)" },
        "Electric Violet": { "--c-57545B": "#140A1F", "--c-716F75": "#24153A", "--c-959294": "#C084FC", "--c-AAAAAA": "#E9D5FF", "--c-7F2B3E": "#A855F7", "--c-661B28": "#1A0E2A", "--color-text-primary": "#F5EDFF", "--logo-filter": "brightness(0) invert(1)" },
        "Soft Beige": { "--c-57545B": "#F5EFE6", "--c-716F75": "#E8DFD1", "--c-959294": "#7C6F64", "--c-AAAAAA": "#3E342E", "--c-7F2B3E": "#C9A27E", "--c-661B28": "#DED2C2", "--color-text-primary": "#2B221D", "--logo-filter": "brightness(0)" },
        "Cool Mint": { "--c-57545B": "#ECFFF9", "--c-716F75": "#D6F7EE", "--c-959294": "#4B9B8A", "--c-AAAAAA": "#244A42", "--c-7F2B3E": "#2DD4BF", "--c-661B28": "#CFF3EA", "--color-text-primary": "#18332C", "--logo-filter": "brightness(0)" },
        "Steel Gray": { "--c-57545B": "#1F2328", "--c-716F75": "#2C3137", "--c-959294": "#9CA3AF", "--c-AAAAAA": "#D1D5DB", "--c-7F2B3E": "#6B7280", "--c-661B28": "#181C20", "--color-text-primary": "#F3F4F6", "--logo-filter": "brightness(0) invert(1)" },
        "Pastel Sky": { "--c-57545B": "#EAF4FF", "--c-716F75": "#D6E9FF", "--c-959294": "#6B85A6", "--c-AAAAAA": "#2E3F52", "--c-7F2B3E": "#7CB9E8", "--c-661B28": "#CFE2FF", "--color-text-primary": "#1F2F3F", "--logo-filter": "brightness(0)" },
        "Rose Gold": { "--c-57545B": "#2B1A1A", "--c-716F75": "#3D2727", "--c-959294": "#E6A4A4", "--c-AAAAAA": "#FFDADA", "--c-7F2B3E": "#FF8C8C", "--c-661B28": "#261414", "--color-text-primary": "#FFECEC", "--logo-filter": "brightness(0) invert(1)" },

        "Night Lavender": { "--c-57545B": "#18132A", "--c-716F75": "#2A2144", "--c-959294": "#B9A7FF", "--c-AAAAAA": "#E5DEFF", "--c-7F2B3E": "#8B7BFF", "--c-661B28": "#1A1536", "--color-text-primary": "#F3F0FF", "--logo-filter": "brightness(0) invert(1)" },
        "Ice Blue": { "--c-57545B": "#E6F7FF", "--c-716F75": "#D0EDFF", "--c-959294": "#5A8CA6", "--c-AAAAAA": "#2C4F5F", "--c-7F2B3E": "#4FC3F7", "--c-661B28": "#C7E6F5", "--color-text-primary": "#1A2F38", "--logo-filter": "brightness(0)" },
        "Sunrise Glow": { "--c-57545B": "#2A120F", "--c-716F75": "#3D1F1A", "--c-959294": "#FFAA7A", "--c-AAAAAA": "#FFD9C2", "--c-7F2B3E": "#FF7849", "--c-661B28": "#26100D", "--color-text-primary": "#FFEDE5", "--logo-filter": "brightness(0) invert(1)" },
        "Deep Plum": { "--c-57545B": "#1A0F1A", "--c-716F75": "#2A1A2A", "--c-959294": "#C084C0", "--c-AAAAAA": "#F2D4F2", "--c-7F2B3E": "#A855A8", "--c-661B28": "#170C17", "--color-text-primary": "#FFEAFE", "--logo-filter": "brightness(0) invert(1)" },
        "Ocean Breeze": { "--c-57545B": "#E6FBFF", "--c-716F75": "#D0F3F9", "--c-959294": "#4C8CA6", "--c-AAAAAA": "#2A4F5F", "--c-7F2B3E": "#38BDF8", "--c-661B28": "#C7EDF3", "--color-text-primary": "#1A2F36", "--logo-filter": "brightness(0)" },
        "Sandstone": { "--c-57545B": "#F4E8D9", "--c-716F75": "#E6D6C3", "--c-959294": "#8B7B6A", "--c-AAAAAA": "#3F362F", "--c-7F2B3E": "#D6A77A", "--c-661B28": "#DCC9B3", "--color-text-primary": "#2A231D", "--logo-filter": "brightness(0)" },
        "Cyber Lime": { "--c-57545B": "#0F140A", "--c-716F75": "#1F2A14", "--c-959294": "#BEF264", "--c-AAAAAA": "#ECFCCB", "--c-7F2B3E": "#84CC16", "--c-661B28": "#12180C", "--color-text-primary": "#F7FFE5", "--logo-filter": "brightness(0) invert(1)" },
        "Graphite": { "--c-57545B": "#121212", "--c-716F75": "#1E1E1E", "--c-959294": "#8E8E8E", "--c-AAAAAA": "#D4D4D4", "--c-7F2B3E": "#A3A3A3", "--c-661B28": "#161616", "--color-text-primary": "#F5F5F5", "--logo-filter": "brightness(0) invert(1)" },
        "Blush Pink": { "--c-57545B": "#FFF0F5", "--c-716F75": "#FFE0EB", "--c-959294": "#9C6A7A", "--c-AAAAAA": "#4A2F37", "--c-7F2B3E": "#FF85A2", "--c-661B28": "#F8D4E0", "--color-text-primary": "#2A1A20", "--logo-filter": "brightness(0)" },
        "Neon Sunset": { "--c-57545B": "#140A0A", "--c-716F75": "#241414", "--c-959294": "#FF6EC7", "--c-AAAAAA": "#FFD6F5", "--c-7F2B3E": "#FF3CAC", "--c-661B28": "#180C0C", "--color-text-primary": "#FFEAFB", "--logo-filter": "brightness(0) invert(1)" }
        ,
        "Azure Dream": { "--c-57545B": "#0E1A2F", "--c-716F75": "#1C2E4A", "--c-959294": "#7AB8FF", "--c-AAAAAA": "#D6E9FF", "--c-7F2B3E": "#4DA3FF", "--c-661B28": "#0C1726", "--color-text-primary": "#ECF5FF", "--logo-filter": "brightness(0) invert(1)" },
        "Warm Cocoa": { "--c-57545B": "#2A1B16", "--c-716F75": "#3D2A23", "--c-959294": "#C89B8A", "--c-AAAAAA": "#F2DAD2", "--c-7F2B3E": "#A97155", "--c-661B28": "#261712", "--color-text-primary": "#FFF1EC", "--logo-filter": "brightness(0) invert(1)" },
        "Faded Denim": { "--c-57545B": "#1E2A35", "--c-716F75": "#2C3E50", "--c-959294": "#7FA1C2", "--c-AAAAAA": "#D4E2F0", "--c-7F2B3E": "#5A8BB0", "--c-661B28": "#1A242E", "--color-text-primary": "#EAF3FA", "--logo-filter": "brightness(0) invert(1)" },
        "Soft Lilac": { "--c-57545B": "#F4F0FF", "--c-716F75": "#E6E0FA", "--c-959294": "#7A6FA3", "--c-AAAAAA": "#3E375A", "--c-7F2B3E": "#A78BFA", "--c-661B28": "#DAD4F0", "--color-text-primary": "#241F36", "--logo-filter": "brightness(0)" },
        "Teal Depths": { "--c-57545B": "#0A1F1F", "--c-716F75": "#143333", "--c-959294": "#5EEAD4", "--c-AAAAAA": "#CCFBF1", "--c-7F2B3E": "#14B8A6", "--c-661B28": "#0C2626", "--color-text-primary": "#E6FFFB", "--logo-filter": "brightness(0) invert(1)" },
        "Burnt Sunset": { "--c-57545B": "#2A130A", "--c-716F75": "#3D2215", "--c-959294": "#FF9A5A", "--c-AAAAAA": "#FFD8B5", "--c-7F2B3E": "#FF6A00", "--c-661B28": "#260F07", "--color-text-primary": "#FFEFE3", "--logo-filter": "brightness(0) invert(1)" },
        "Icy Lavender": { "--c-57545B": "#EEF2FF", "--c-716F75": "#E0E7FF", "--c-959294": "#6B7280", "--c-AAAAAA": "#2D3748", "--c-7F2B3E": "#A5B4FC", "--c-661B28": "#D6DCFA", "--color-text-primary": "#1A202C", "--logo-filter": "brightness(0)" },
        "Dark Moss": { "--c-57545B": "#0F1A0F", "--c-716F75": "#1E2E1E", "--c-959294": "#84CC16", "--c-AAAAAA": "#D9F99D", "--c-7F2B3E": "#65A30D", "--c-661B28": "#132013", "--color-text-primary": "#F7FEE7", "--logo-filter": "brightness(0) invert(1)" },
        "Silver Mist": { "--c-57545B": "#F3F4F6", "--c-716F75": "#E5E7EB", "--c-959294": "#6B7280", "--c-AAAAAA": "#374151", "--c-7F2B3E": "#9CA3AF", "--c-661B28": "#D1D5DB", "--color-text-primary": "#111827", "--logo-filter": "brightness(0)" },
        "Electric Cyan": { "--c-57545B": "#061A1F", "--c-716F75": "#0F2F36", "--c-959294": "#22D3EE", "--c-AAAAAA": "#CFFAFE", "--c-7F2B3E": "#06B6D4", "--c-661B28": "#082227", "--color-text-primary": "#ECFEFF", "--logo-filter": "brightness(0) invert(1)" },

        "Soft Coral": { "--c-57545B": "#FFF1ED", "--c-716F75": "#FFE4DD", "--c-959294": "#9C6A5C", "--c-AAAAAA": "#4A2F29", "--c-7F2B3E": "#FF7F66", "--c-661B28": "#FAD4CC", "--color-text-primary": "#2A1A17", "--logo-filter": "brightness(0)" },
        "Deep Indigo": { "--c-57545B": "#0F102A", "--c-716F75": "#1C1E44", "--c-959294": "#818CF8", "--c-AAAAAA": "#DDE1FF", "--c-7F2B3E": "#6366F1", "--c-661B28": "#141633", "--color-text-primary": "#EEF2FF", "--logo-filter": "brightness(0) invert(1)" },
        "Golden Hour": { "--c-57545B": "#2A1F0A", "--c-716F75": "#3D2E15", "--c-959294": "#FFD166", "--c-AAAAAA": "#FFF3BF", "--c-7F2B3E": "#FFC300", "--c-661B28": "#261A07", "--color-text-primary": "#FFF8E1", "--logo-filter": "brightness(0) invert(1)" },
        "Polar Night": { "--c-57545B": "#05070F", "--c-716F75": "#0C1224", "--c-959294": "#64748B", "--c-AAAAAA": "#CBD5F5", "--c-7F2B3E": "#475569", "--c-661B28": "#070B18", "--color-text-primary": "#F1F5F9", "--logo-filter": "brightness(0) invert(1)" },
        "Fresh Lime": { "--c-57545B": "#F7FEE7", "--c-716F75": "#ECFCCB", "--c-959294": "#4D7C0F", "--c-AAAAAA": "#1A2E05", "--c-7F2B3E": "#84CC16", "--c-661B28": "#D9F99D", "--color-text-primary": "#1A2E05", "--logo-filter": "brightness(0)" },
        "Muted Rose": { "--c-57545B": "#2A1A1D", "--c-716F75": "#3D2A2F", "--c-959294": "#D8A7B1", "--c-AAAAAA": "#F5DDE3", "--c-7F2B3E": "#C08497", "--c-661B28": "#261417", "--color-text-primary": "#FFEFF3", "--logo-filter": "brightness(0) invert(1)" },
        "Slate Blue": { "--c-57545B": "#1E293B", "--c-716F75": "#334155", "--c-959294": "#94A3B8", "--c-AAAAAA": "#E2E8F0", "--c-7F2B3E": "#64748B", "--c-661B28": "#0F172A", "--color-text-primary": "#F8FAFC", "--logo-filter": "brightness(0) invert(1)" },
        "Soft Mint": { "--c-57545B": "#ECFDF5", "--c-716F75": "#D1FAE5", "--c-959294": "#065F46", "--c-AAAAAA": "#022C22", "--c-7F2B3E": "#10B981", "--c-661B28": "#A7F3D0", "--color-text-primary": "#022C22", "--logo-filter": "brightness(0)" },
        "Ruby Glow": { "--c-57545B": "#1A0A0A", "--c-716F75": "#2A1414", "--c-959294": "#F87171", "--c-AAAAAA": "#FECACA", "--c-7F2B3E": "#DC2626", "--c-661B28": "#140707", "--color-text-primary": "#FFE4E6", "--logo-filter": "brightness(0) invert(1)" },
        "Cool Shadow": { "--c-57545B": "#111827", "--c-716F75": "#1F2937", "--c-959294": "#9CA3AF", "--c-AAAAAA": "#E5E7EB", "--c-7F2B3E": "#6B7280", "--c-661B28": "#0B1120", "--color-text-primary": "#F9FAFB", "--logo-filter": "brightness(0) invert(1)" },

        "Carbon Black": { "--c-57545B": "#0A0A0A", "--c-716F75": "#141414", "--c-959294": "#666666", "--c-AAAAAA": "#BBBBBB", "--c-7F2B3E": "#888888", "--c-661B28": "#101010", "--color-text-primary": "#EEEEEE", "--logo-filter": "brightness(0) invert(1)" },
        "Pure White": { "--c-57545B": "#FFFFFF", "--c-716F75": "#F2F2F2", "--c-959294": "#555555", "--c-AAAAAA": "#222222", "--c-7F2B3E": "#888888", "--c-661B28": "#E6E6E6", "--color-text-primary": "#111111", "--logo-filter": "brightness(0)" }
    };
    const existing = document.getElementById("dev-theme-switcher");
    if (existing) existing.remove();

    const gui = document.createElement("div");
    gui.id = "dev-theme-switcher";
    gui.style.cssText = `
        position: fixed; top: 100px; right: 20px; width: 260px;
        background: rgba(15,15,15,0.9); backdrop-filter: blur(14px);
        border: 1px solid #333; border-radius: 14px; z-index: 999999;
        font-family: system-ui; color: #fff;
        box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        display: flex; flex-direction: column;
    `;

    // HEADER
    const header = document.createElement("div");
    header.style.cssText = `
        padding: 12px;
        background: #000;
        border-bottom: 1px solid #333;
        cursor: grab;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 10;
    `;
    header.innerHTML = `<span>🎨 Theme Studio</span><span id="dev-close" style="cursor:pointer; color:#888;">✕</span>`;
    gui.appendChild(header);

    // SEARCH
    const search = document.createElement("input");
    search.placeholder = "Search themes...";
    search.style.cssText = `
        width: 100%;
        padding: 8px 10px;
        background: #111;
        border: none;
        border-bottom: 1px solid #333;
        color: #fff;
        outline: none;
        font-size: 13px;
    `;
    gui.appendChild(search);

    // LIST CONTAINER
    const list = document.createElement("div");
    list.style.cssText = `
        max-height: 320px;
        overflow-y: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    `;
    gui.appendChild(list);

    let activeBtn = null;

    function render(filter = "") {
        list.innerHTML = "";

        Object.keys(presets)
            .filter(name => name.toLowerCase().includes(filter.toLowerCase()))
            .forEach(themeName => {
                const btn = document.createElement("button");
                btn.innerText = themeName;

                btn.style.cssText = `
                    width: 100%;
                    padding: 8px 10px;
                    background: #1a1a1a;
                    color: #ccc;
                    border: 1px solid #333;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 13px;
                    text-align: left;
                    transition: 0.15s;
                `;

                btn.onmouseenter = () => btn.style.background = "#262626";
                btn.onmouseleave = () => {
                    if (btn !== activeBtn) btn.style.background = "#1a1a1a";
                };

                btn.onclick = () => {
                    document.documentElement.removeAttribute("data-theme");

                    const vars = presets[themeName];
                    for (let prop in vars) {
                        document.documentElement.style.setProperty(prop, vars[prop]);
                    }

                    if (window.updateParticlesTheme) {
                        window.updateParticlesTheme();
                    }

                    // highlight active
                    if (activeBtn) activeBtn.style.background = "#1a1a1a";
                    btn.style.background = "#333";
                    activeBtn = btn;
                };

                list.appendChild(btn);
            });
    }

    render();

    search.addEventListener("input", () => {
        render(search.value);
    });

    // FOOTER
    const footer = document.createElement("div");
    footer.style.cssText = "padding:10px; border-top:1px solid #333;";

    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Reset";
    resetBtn.style.cssText = `
        width: 100%;
        padding: 8px;
        background: transparent;
        color: #aaa;
        border: 1px dashed #555;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
    `;
    resetBtn.onclick = () => {
        document.documentElement.style = "";
        if (window.updateParticlesTheme) window.updateParticlesTheme();
    };

    footer.appendChild(resetBtn);
    gui.appendChild(footer);

    document.body.appendChild(gui);

    // DRAG
    let isDragging = false, startX, startY, origX, origY;

    header.onmousedown = (e) => {
        if (e.target.id === 'dev-close') { gui.remove(); return; }
        isDragging = true;
        startX = e.clientX; startY = e.clientY;
        origX = gui.offsetLeft; origY = gui.offsetTop;
        header.style.cursor = "grabbing";
    };

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        gui.style.left = origX + (e.clientX - startX) + "px";
        gui.style.top = origY + (e.clientY - startY) + "px";
        gui.style.right = "auto";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        header.style.cursor = "grab";
    });
})();