import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { FullWidthLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineTooltip,
    SimpleWaveAnimation,
} from "@/components/atoms";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";

/**
 * Section 1: What is a Wave?
 *
 * Introduces the concept of waves using familiar examples and an animated visualization.
 * Target audience: Middle school students
 */
export const section1Blocks: ReactElement[] = [
    // Title block
    <FullWidthLayout key="layout-s1-title" maxWidth="xl">
        <Block id="block-s1-title" padding="md">
            <EditableH1 id="h1-s1-title" blockId="block-s1-title">
                What is a Wave?
            </EditableH1>
        </Block>
    </FullWidthLayout>,

    // Introduction paragraph
    <FullWidthLayout key="layout-s1-intro" maxWidth="xl">
        <Block id="block-s1-intro" padding="sm">
            <EditableParagraph id="para-s1-intro" blockId="block-s1-intro">
                Have you ever thrown a stone into a pond? You probably noticed the{" "}
                <InlineTooltip
                    id="tooltip-ripples"
                    tooltip="Small waves that spread out in circles from where the stone hit the water"
                >
                    ripples
                </InlineTooltip>{" "}
                spreading out across the water. Or maybe you've watched the ocean and seen
                waves rolling toward the beach. These are all examples of waves!
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,

    // What makes a wave
    <FullWidthLayout key="layout-s1-explanation" maxWidth="xl">
        <Block id="block-s1-explanation" padding="sm">
            <EditableH2 id="h2-s1-pattern" blockId="block-s1-explanation">
                The Up-and-Down Pattern
            </EditableH2>
            <EditableParagraph id="para-s1-pattern" blockId="block-s1-explanation">
                A wave is a repeating pattern that moves through space. Watch the animation
                below and notice how the wave goes{" "}
                <InlineTooltip
                    id="tooltip-updown"
                    tooltip="Waves move in a smooth, continuous up-and-down motion"
                color="#D81B60"
                bgColor="rgba(216, 27, 96, 0.15)"
                >
                    up and down
                </InlineTooltip>{" "}
                over and over again. The red dot shows how any single point on the wave moves
                — it doesn't travel sideways, it just bobs up and down!
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,

    // Wave animation
    <FullWidthLayout key="layout-s1-animation" maxWidth="xl">
        <Block id="block-s1-animation" padding="md">
            <SimpleWaveAnimation speedVarName="waveSpeed" height={280} />
        </Block>
    </FullWidthLayout>,

    // Interactive speed control
    <FullWidthLayout key="layout-s1-interact" maxWidth="xl">
        <Block id="block-s1-interact" padding="sm">
            <EditableParagraph id="para-s1-interact" blockId="block-s1-interact">
                Try changing the wave speed to{" "}
                <InlineScrubbleNumber
                    id="scrubble-wave-speed"
                    varName="waveSpeed"
                    {...numberPropsFromDefinition(getVariableInfo("waveSpeed"))}
                />{" "}
                by dragging the number left or right. Watch how the wave moves faster or slower!
                Notice that no matter how fast or slow the wave moves, it always keeps the same
                smooth, repeating pattern.
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,

    // Key takeaway
    <FullWidthLayout key="layout-s1-takeaway" maxWidth="xl">
        <Block id="block-s1-takeaway" padding="md">
            <EditableH2 id="h2-s1-takeaway" blockId="block-s1-takeaway">
                Key Idea
            </EditableH2>
            <EditableParagraph id="para-s1-takeaway" blockId="block-s1-takeaway">
                Waves are everywhere around us — in water, in sound, and even in light!
                What makes something a wave is this repeating up-and-down pattern that
                travels from one place to another. In the next section, we'll meet a very
                special kind of wave called the{" "}
                <InlineTooltip
                    id="tooltip-sine"
                    tooltip="The smoothest and most perfect wave shape in mathematics"
                >
                    sine wave
                </InlineTooltip>.
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,
];
