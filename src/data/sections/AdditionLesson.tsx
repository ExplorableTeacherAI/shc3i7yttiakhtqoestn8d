import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineClozeChoice,
    InlineFeedback,
} from "@/components/atoms";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ─────────────────────────────────────────
// Reactive Visualization: Colorful Circles Combining
// ─────────────────────────────────────────
function AdditionCirclesVisualization() {
    const firstNumber = useVar("firstNumber", 3) as number;
    const secondNumber = useVar("secondNumber", 2) as number;
    const total = firstNumber + secondNumber;

    // Generate circle positions for first group (red)
    const firstCircles = Array.from({ length: firstNumber }, (_, i) => ({
        x: 60 + i * 50,
        y: 80,
        color: "#ef4444",
    }));

    // Generate circle positions for second group (blue)
    const secondCircles = Array.from({ length: secondNumber }, (_, i) => ({
        x: 60 + i * 50,
        y: 160,
        color: "#3b82f6",
    }));

    // Generate combined circles (showing the total)
    const combinedCircles = Array.from({ length: total }, (_, i) => ({
        x: 40 + i * 45,
        y: 280,
        color: i < firstNumber ? "#ef4444" : "#3b82f6",
    }));

    return (
        <div className="relative">
            <svg
                width="100%"
                height={360}
                viewBox="0 0 400 360"
                className="bg-white rounded-lg border border-slate-200"
            >
                {/* First group label */}
                <text
                    x={20}
                    y={85}
                    fontSize={18}
                    fontWeight="bold"
                    fill="#ef4444"
                >
                    {firstNumber}
                </text>

                {/* First group circles */}
                {firstCircles.map((circle, i) => (
                    <circle
                        key={`first-${i}`}
                        cx={circle.x}
                        cy={circle.y}
                        r={20}
                        fill={circle.color}
                        opacity={0.9}
                    />
                ))}

                {/* Plus sign */}
                <text
                    x={185}
                    y={130}
                    fontSize={32}
                    fontWeight="bold"
                    fill="#64748b"
                    textAnchor="middle"
                >
                    +
                </text>

                {/* Second group label */}
                <text
                    x={20}
                    y={165}
                    fontSize={18}
                    fontWeight="bold"
                    fill="#3b82f6"
                >
                    {secondNumber}
                </text>

                {/* Second group circles */}
                {secondCircles.map((circle, i) => (
                    <circle
                        key={`second-${i}`}
                        cx={circle.x}
                        cy={circle.y}
                        r={20}
                        fill={circle.color}
                        opacity={0.9}
                    />
                ))}

                {/* Equals line */}
                <line
                    x1={30}
                    y1={210}
                    x2={370}
                    y2={210}
                    stroke="#94a3b8"
                    strokeWidth={3}
                    strokeDasharray="8,4"
                />

                {/* Equals sign */}
                <text
                    x={200}
                    y={245}
                    fontSize={28}
                    fontWeight="bold"
                    fill="#64748b"
                    textAnchor="middle"
                >
                    =
                </text>

                {/* Total label */}
                <text
                    x={20}
                    y={285}
                    fontSize={18}
                    fontWeight="bold"
                    fill="#22c55e"
                >
                    {total}
                </text>

                {/* Combined circles */}
                {combinedCircles.map((circle, i) => (
                    <circle
                        key={`combined-${i}`}
                        cx={circle.x}
                        cy={circle.y}
                        r={20}
                        fill={circle.color}
                        opacity={0.9}
                    />
                ))}

                {/* Result text */}
                <text
                    x={200}
                    y={335}
                    fontSize={20}
                    fontWeight="bold"
                    fill="#22c55e"
                    textAnchor="middle"
                >
                    Total: {total} circles!
                </text>
            </svg>
            <InteractionHintSequence
                hintKey="addition-circles-scrub"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the numbers below to change the circles",
                        position: { x: "50%", y: "95%" },
                    },
                ]}
            />
        </div>
    );
}

// Reactive component to show the sum
function ReactiveSum() {
    const firstNumber = useVar("firstNumber", 3) as number;
    const secondNumber = useVar("secondNumber", 2) as number;
    const total = firstNumber + secondNumber;
    return <span className="font-bold text-green-600">{total}</span>;
}

// ─────────────────────────────────────────
// SECTION 1: What is Addition?
// ─────────────────────────────────────────
export const section1WhatIsAddition: ReactElement[] = [
    <StackLayout key="layout-addition-title" maxWidth="xl">
        <Block id="addition-title" padding="md">
            <EditableH1 id="h1-addition-title" blockId="addition-title">
                Learning to Add Numbers
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-addition-intro" maxWidth="xl">
        <Block id="addition-intro" padding="sm">
            <EditableParagraph id="para-addition-intro" blockId="addition-intro">
                Have you ever collected stickers or toys? When you get more of something and put them together with what you already have, you are doing something special in math. It is called <strong>addition</strong>!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-addition-explanation" maxWidth="xl">
        <Block id="addition-explanation" padding="sm">
            <EditableParagraph
                id="para-addition-explanation"
                blockId="addition-explanation"
            >
                Addition means <strong>putting things together</strong> to find out how many you have in total. When we add, we combine groups to make one bigger group.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────
// SECTION 2: See It in Action
// ─────────────────────────────────────────
export const section2SeeItInAction: ReactElement[] = [
    <StackLayout key="layout-action-heading" maxWidth="xl">
        <Block id="action-heading" padding="md">
            <EditableH2 id="h2-action-heading" blockId="action-heading">
                See It in Action
            </EditableH2>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-action-visual" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="action-description" padding="sm">
                <EditableParagraph
                    id="para-action-description"
                    blockId="action-description"
                >
                    Look at the colorful circles! The{" "}
                    <span className="font-bold text-red-500">red circles</span> show
                    our first number, and the{" "}
                    <span className="font-bold text-blue-500">blue circles</span>{" "}
                    show our second number.
                </EditableParagraph>
            </Block>
            <Block id="action-interactive" padding="sm">
                <EditableParagraph
                    id="para-action-interactive"
                    blockId="action-interactive"
                >
                    We have{" "}
                    <InlineScrubbleNumber
                        varName="firstNumber"
                        {...numberPropsFromDefinition(getVariableInfo("firstNumber"))}
                    />{" "}
                    red circles and{" "}
                    <InlineScrubbleNumber
                        varName="secondNumber"
                        {...numberPropsFromDefinition(getVariableInfo("secondNumber"))}
                    />{" "}
                    blue circles. When we put them all together, we get{" "}
                    <ReactiveSum /> circles in total!
                </EditableParagraph>
            </Block>
            <Block id="action-try-it" padding="sm">
                <EditableParagraph id="para-action-try-it" blockId="action-try-it">
                    Try changing the numbers and watch what happens to the circles. Can you see how the total changes?
                </EditableParagraph>
            </Block>
        </div>
        <Block id="action-visualization" padding="sm" hasVisualization>
            <AdditionCirclesVisualization />
        </Block>
    </SplitLayout>,
];

// ─────────────────────────────────────────
// SECTION 3: The Plus Sign (+)
// ─────────────────────────────────────────
export const section3ThePlusSign: ReactElement[] = [
    <StackLayout key="layout-plus-heading" maxWidth="xl">
        <Block id="plus-heading" padding="md">
            <EditableH2 id="h2-plus-heading" blockId="plus-heading">
                The Plus Sign (+)
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-plus-intro" maxWidth="xl">
        <Block id="plus-intro" padding="sm">
            <EditableParagraph id="para-plus-intro" blockId="plus-intro">
                When we write addition in math, we use a special symbol: the <strong>plus sign (+)</strong>. It looks like a little cross and it tells us to put numbers together.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-plus-example" maxWidth="xl">
        <Block id="plus-example" padding="sm">
            <EditableParagraph id="para-plus-example" blockId="plus-example">
                When we write <strong>3 + 2 = 5</strong>, we are saying: "Three plus two equals five." The plus sign (+) means "add" and the equals sign (=) shows us the answer!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-plus-understanding" maxWidth="xl">
        <Block id="plus-understanding" padding="sm">
            <EditableParagraph
                id="para-plus-understanding"
                blockId="plus-understanding"
            >
                Addition is all about{" "}
                <InlineFeedback
                    varName="understandingAnswer"
                    correctValue="putting together"
                    position="mid"
                    successMessage="Exactly right!"
                    failureMessage="Not quite."
                    hint="Think about what happens when we combine things"
                >
                    <InlineClozeChoice
                        varName="understandingAnswer"
                        correctAnswer="putting together"
                        options={["taking away", "putting together", "dividing"]}
                        {...choicePropsFromDefinition(
                            getVariableInfo("understandingAnswer")
                        )}
                    />
                </InlineFeedback>{" "}
                things to find the total.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────
// SECTION 4: Practice Time
// ─────────────────────────────────────────
export const section4PracticeTime: ReactElement[] = [
    <StackLayout key="layout-practice-heading" maxWidth="xl">
        <Block id="practice-heading" padding="md">
            <EditableH2 id="h2-practice-heading" blockId="practice-heading">
                Practice Time
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="practice-intro">
                Now it is your turn! Try solving these addition problems. Type your answer in the box.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-question-one" maxWidth="xl">
        <Block id="practice-question-one" padding="sm">
            <EditableParagraph
                id="para-practice-question-one"
                blockId="practice-question-one"
            >
                If you have 2 apples and someone gives you 3 more apples, how many apples do you have now? 2 + 3 ={" "}
                <InlineFeedback
                    varName="practiceAnswer1"
                    correctValue="5"
                    position="terminal"
                    successMessage="Wonderful! 2 + 3 = 5. You now have 5 apples"
                    failureMessage="Almost!"
                    hint="Count 2 apples, then count 3 more"
                >
                    <InlineClozeInput
                        varName="practiceAnswer1"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("practiceAnswer1"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-question-two" maxWidth="xl">
        <Block id="practice-question-two" padding="sm">
            <EditableParagraph
                id="para-practice-question-two"
                blockId="practice-question-two"
            >
                You see 4 birds on a tree. Then 1 more bird comes. How many birds are there now? 4 + 1 ={" "}
                <InlineFeedback
                    varName="practiceAnswer2"
                    correctValue="5"
                    position="terminal"
                    successMessage="Great job! 4 + 1 = 5. There are 5 birds"
                    failureMessage="Try again!"
                    hint="Start with 4 and add 1 more"
                >
                    <InlineClozeInput
                        varName="practiceAnswer2"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("practiceAnswer2"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-question-three" maxWidth="xl">
        <Block id="practice-question-three" padding="sm">
            <EditableParagraph
                id="para-practice-question-three"
                blockId="practice-question-three"
            >
                You have 1 pencil in your bag and your friend gives you 4 more. How many pencils do you have altogether? 1 + 4 ={" "}
                <InlineFeedback
                    varName="practiceAnswer3"
                    correctValue="5"
                    position="terminal"
                    successMessage="Excellent! 1 + 4 = 5. You have 5 pencils now"
                    failureMessage="Not quite."
                    hint="1 pencil plus 4 more pencils"
                >
                    <InlineClozeInput
                        varName="practiceAnswer3"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("practiceAnswer3"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-practice-congratulations" maxWidth="xl">
        <Block id="practice-congratulations" padding="md">
            <EditableParagraph
                id="para-practice-congratulations"
                blockId="practice-congratulations"
            >
                You are doing great! Remember, addition is just putting things together. Keep practicing and you will become an addition expert!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────
// EXPORT ALL BLOCKS
// ─────────────────────────────────────────
export const additionLessonBlocks: ReactElement[] = [
    ...section1WhatIsAddition,
    ...section2SeeItInAction,
    ...section3ThePlusSign,
    ...section4PracticeTime,
];
