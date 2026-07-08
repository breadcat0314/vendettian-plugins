import { plugin } from "@vendetta";
import { findByProps } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";

const { ScrollView } = findByProps("ScrollView");
const { TableRadioGroup, TableRadioRow, Stack } = findByProps(
    "TableRadioGroup", "TableRadioRow", "Stack",
);

const GridQualities = ["gif", "tinygif", "nanogif"] as const;

const labels: Record<string, { label: string; subLabel: string }> = {
    gif: { label: "GIF", subLabel: "Original quality, ~500px — slowest" },
    tinygif: { label: "TinyGIF", subLabel: "Small animated thumbnail, ~200px — default" },
    nanogif: { label: "NanoGIF", subLabel: "Tiny thumbnail, ~100px — fastest" },
};

const get = (key: string, fallback: any) => plugin.storage[key] ?? fallback;
const set = (key: string, value: any) => { plugin.storage[key] = value; };

export default function BringBackTenorSettings() {
    const [, forceUpdate] = React.useReducer((x: number) => ~x, 0);

    return (
        <ScrollView style={{ flex: 1 }}>
            <Stack style={{ padding: 16 }} spacing={16}>
                <TableRadioGroup
                    title="Grid Quality"
                    value={get("gridQuality", "tinygif")}
                    onChange={(v: string) => { set("gridQuality", v); forceUpdate(); }}
                >
                    {GridQualities.map(q => (
                        <TableRadioRow
                            key={q}
                            label={labels[q].label}
                            subLabel={labels[q].subLabel}
                            value={q}
                        />
                    ))}
                </TableRadioGroup>
            </Stack>
        </ScrollView>
    );
}
