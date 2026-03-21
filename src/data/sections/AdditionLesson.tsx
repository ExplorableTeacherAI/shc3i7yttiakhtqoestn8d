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
                If you have 2 cookies and your friend gives you 4 more cookies, how many cookies do you have now? 2 + 4 ={" "}
                <InlineFeedback
                    varName="practiceAnswer1"
                    correctValue="6"
                    position="terminal"
                    successMessage="Wonderful! 2 + 4 = 6. You now have 6 cookies"
                    failureMessage="Almost!"
                    hint="Count 2 cookies, then count 4 more"
                >
                    <InlineClozeInput
                        varName="practiceAnswer1"
                        correctAnswer="6"
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
                You see 3 birds on a tree. Then 5 more birds fly over and sit on the tree. How many birds are there now? 3 + 5 ={" "}
                <InlineFeedback
                    varName="practiceAnswer2"
                    correctValue="8"
                    position="terminal"
                    successMessage="Great job! 3 + 5 = 8. There are 8 birds"
                    failureMessage="Try again!"
                    hint="Start with 3 and add 5 more"
                >
                    <InlineClozeInput
                        varName="practiceAnswer2"
                        correctAnswer="8"
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
                You have 4 crayons and your teacher gives you 3 more. How many crayons do you have altogether? 4 + 3 ={" "}
                <InlineFeedback
                    varName="practiceAnswer3"
                    correctValue="7"
                    position="terminal"
                    successMessage="Excellent! 4 + 3 = 7. You have 7 crayons now"
                    failureMessage="Not quite."
                    hint="4 crayons plus 3 more crayons"
                >
                    <InlineClozeInput
                        varName="practiceAnswer3"
                        correctAnswer="7"
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
                You are doing great! Now let us try some fun activities!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];

// ─────────────────────────────────────────
// Counting Challenge Game Visualization
// ─────────────────────────────────────────
function CountingChallengeGame() {
    const stars = useVar("challengeStars", 2) as number;
    const hearts = useVar("challengeHearts", 3) as number;

    // Star emoji positions
    const starPositions = Array.from({ length: stars }, (_, i) => ({
        x: 50 + i * 55,
        y: 70,
    }));

    // Heart emoji positions
    const heartPositions = Array.from({ length: hearts }, (_, i) => ({
        x: 50 + i * 55,
        y: 150,
    }));

    return (
        <div className="relative">
            <svg
                width="100%"
                height={260}
                viewBox="0 0 380 260"
                className="bg-gradient-to-b from-amber-50 to-pink-50 rounded-xl border-2 border-amber-200"
            >
                {/* Title */}
                <text
                    x={190}
                    y={30}
                    fontSize={18}
                    fontWeight="bold"
                    fill="#78350f"
                    textAnchor="middle"
                >
                    Count the shapes!
                </text>

                {/* Stars row label */}
                <text x={20} y={75} fontSize={14} fill="#f59e0b" fontWeight="bold">
                    ⭐
                </text>

                {/* Draw stars */}
                {starPositions.map((pos, i) => (
                    <text
                        key={`star-${i}`}
                        x={pos.x}
                        y={pos.y}
                        fontSize={36}
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        ⭐
                    </text>
                ))}

                {/* Star count */}
                <text
                    x={340}
                    y={75}
                    fontSize={20}
                    fontWeight="bold"
                    fill="#f59e0b"
                    textAnchor="middle"
                >
                    {stars}
                </text>

                {/* Plus sign */}
                <text
                    x={190}
                    y={115}
                    fontSize={28}
                    fontWeight="bold"
                    fill="#64748b"
                    textAnchor="middle"
                >
                    +
                </text>

                {/* Hearts row label */}
                <text x={20} y={155} fontSize={14} fill="#ec4899" fontWeight="bold">
                    💖
                </text>

                {/* Draw hearts */}
                {heartPositions.map((pos, i) => (
                    <text
                        key={`heart-${i}`}
                        x={pos.x}
                        y={pos.y}
                        fontSize={36}
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        💖
                    </text>
                ))}

                {/* Heart count */}
                <text
                    x={340}
                    y={155}
                    fontSize={20}
                    fontWeight="bold"
                    fill="#ec4899"
                    textAnchor="middle"
                >
                    {hearts}
                </text>

                {/* Divider line */}
                <line
                    x1={30}
                    y1={190}
                    x2={350}
                    y2={190}
                    stroke="#d97706"
                    strokeWidth={3}
                    strokeDasharray="8,4"
                />

                {/* Total label */}
                <text
                    x={190}
                    y={230}
                    fontSize={18}
                    fontWeight="bold"
                    fill="#78350f"
                    textAnchor="middle"
                >
                    How many shapes altogether?
                </text>
            </svg>
        </div>
    );
}

// ─────────────────────────────────────────
// Number Line Jumping Visualization
// ─────────────────────────────────────────
function NumberLineJumping() {
    const start = useVar("jumpStart", 2) as number;
    const jumpAmount = useVar("jumpAmount", 3) as number;
    const end = start + jumpAmount;

    // Number line positions
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const lineStart = 30;
    const lineEnd = 370;
    const lineY = 120;
    const spacing = (lineEnd - lineStart) / 10;

    return (
        <div className="relative">
            <svg
                width="100%"
                height={220}
                viewBox="0 0 400 220"
                className="bg-gradient-to-b from-green-50 to-blue-50 rounded-xl border-2 border-green-200"
            >
                {/* Title */}
                <text
                    x={200}
                    y={25}
                    fontSize={16}
                    fontWeight="bold"
                    fill="#166534"
                    textAnchor="middle"
                >
                    Watch the frog jump!
                </text>

                {/* Number line */}
                <line
                    x1={lineStart}
                    y1={lineY}
                    x2={lineEnd}
                    y2={lineY}
                    stroke="#374151"
                    strokeWidth={3}
                />

                {/* Tick marks and numbers */}
                {numbers.map((num) => {
                    const x = lineStart + num * spacing;
                    const isStart = num === start;
                    const isEnd = num === end && end <= 10;
                    return (
                        <g key={num}>
                            <line
                                x1={x}
                                y1={lineY - 8}
                                x2={x}
                                y2={lineY + 8}
                                stroke="#374151"
                                strokeWidth={2}
                            />
                            <text
                                x={x}
                                y={lineY + 28}
                                fontSize={14}
                                fontWeight={isStart || isEnd ? "bold" : "normal"}
                                fill={isStart ? "#22c55e" : isEnd ? "#3b82f6" : "#374151"}
                                textAnchor="middle"
                            >
                                {num}
                            </text>
                            {isStart && (
                                <circle cx={x} cy={lineY} r={8} fill="#22c55e" />
                            )}
                            {isEnd && end <= 10 && (
                                <circle cx={x} cy={lineY} r={8} fill="#3b82f6" />
                            )}
                        </g>
                    );
                })}

                {/* Jump arcs */}
                {Array.from({ length: Math.min(jumpAmount, 10 - start) }, (_, i) => {
                    const fromX = lineStart + (start + i) * spacing;
                    const toX = lineStart + (start + i + 1) * spacing;
                    const midX = (fromX + toX) / 2;
                    return (
                        <g key={`jump-${i}`}>
                            <path
                                d={`M ${fromX} ${lineY - 10} Q ${midX} ${lineY - 45} ${toX} ${lineY - 10}`}
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth={2}
                                strokeDasharray="4,2"
                            />
                            <text
                                x={midX}
                                y={lineY - 50}
                                fontSize={16}
                                textAnchor="middle"
                            >
                                🐸
                            </text>
                        </g>
                    );
                })}

                {/* Frog at start */}
                <text
                    x={lineStart + start * spacing}
                    y={lineY - 25}
                    fontSize={28}
                    textAnchor="middle"
                >
                    🐸
                </text>

                {/* Landing spot */}
                {end <= 10 && (
                    <text
                        x={lineStart + end * spacing}
                        y={lineY + 55}
                        fontSize={20}
                        textAnchor="middle"
                    >
                        🎯
                    </text>
                )}

                {/* Instruction */}
                <text
                    x={200}
                    y={195}
                    fontSize={14}
                    fill="#374151"
                    textAnchor="middle"
                >
                    Start at {start}, jump {jumpAmount} times. Where does the frog land?
                </text>
            </svg>
        </div>
    );
}

// Reactive total for counting challenge
function ChallengeTotal() {
    const stars = useVar("challengeStars", 2) as number;
    const hearts = useVar("challengeHearts", 3) as number;
    return <span className="font-bold text-purple-600">{stars + hearts}</span>;
}

// Reactive total for number line
function JumpTotal() {
    const start = useVar("jumpStart", 2) as number;
    const jumpAmount = useVar("jumpAmount", 3) as number;
    return <span className="font-bold text-blue-600">{start + jumpAmount}</span>;
}

// ─────────────────────────────────────────
// SECTION 5: Counting Challenge Game
// ─────────────────────────────────────────
export const section5CountingChallenge: ReactElement[] = [
    <StackLayout key="layout-challenge-heading" maxWidth="xl">
        <Block id="challenge-heading" padding="md">
            <EditableH2 id="h2-challenge-heading" blockId="challenge-heading">
                Counting Challenge Game
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-challenge-intro" maxWidth="xl">
        <Block id="challenge-intro" padding="sm">
            <EditableParagraph id="para-challenge-intro" blockId="challenge-intro">
                Let us play a counting game! Count the stars and hearts, then add them together to find the total.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-challenge-game" ratio="1:1" gap="lg">
        <Block id="challenge-visualization" padding="sm" hasVisualization>
            <CountingChallengeGame />
        </Block>
        <div className="space-y-4">
            <Block id="challenge-controls" padding="sm">
                <EditableParagraph
                    id="para-challenge-controls"
                    blockId="challenge-controls"
                >
                    There are{" "}
                    <InlineScrubbleNumber
                        varName="challengeStars"
                        {...numberPropsFromDefinition(getVariableInfo("challengeStars"))}
                    />{" "}
                    stars and{" "}
                    <InlineScrubbleNumber
                        varName="challengeHearts"
                        {...numberPropsFromDefinition(getVariableInfo("challengeHearts"))}
                    />{" "}
                    hearts. Can you count them all?
                </EditableParagraph>
            </Block>
            <Block id="challenge-question" padding="sm">
                <EditableParagraph
                    id="para-challenge-question"
                    blockId="challenge-question"
                >
                    The total number of shapes is <ChallengeTotal />. Change the numbers above and watch the shapes appear and disappear!
                </EditableParagraph>
            </Block>
        </div>
    </SplitLayout>,
];

// ─────────────────────────────────────────
// SECTION 6: Number Line Jumping
// ─────────────────────────────────────────
export const section6NumberLineJumping: ReactElement[] = [
    <StackLayout key="layout-jump-heading" maxWidth="xl">
        <Block id="jump-heading" padding="md">
            <EditableH2 id="h2-jump-heading" blockId="jump-heading">
                Number Line Jumping
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-jump-intro" maxWidth="xl">
        <Block id="jump-intro" padding="sm">
            <EditableParagraph id="para-jump-intro" blockId="jump-intro">
                Here is another fun way to think about addition! Imagine a frog jumping along a number line. Each jump moves the frog forward by one.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-jump-game" ratio="1:1" gap="lg">
        <Block id="jump-visualization" padding="sm" hasVisualization>
            <NumberLineJumping />
        </Block>
        <div className="space-y-4">
            <Block id="jump-controls" padding="sm">
                <EditableParagraph id="para-jump-controls" blockId="jump-controls">
                    The frog starts at{" "}
                    <InlineScrubbleNumber
                        varName="jumpStart"
                        {...numberPropsFromDefinition(getVariableInfo("jumpStart"))}
                    />{" "}
                    and makes{" "}
                    <InlineScrubbleNumber
                        varName="jumpAmount"
                        {...numberPropsFromDefinition(getVariableInfo("jumpAmount"))}
                    />{" "}
                    jumps forward.
                </EditableParagraph>
            </Block>
            <Block id="jump-result" padding="sm">
                <EditableParagraph id="para-jump-result" blockId="jump-result">
                    After jumping, the frog lands on <JumpTotal />! Try changing where the frog starts or how many times it jumps.
                </EditableParagraph>
            </Block>
            <Block id="jump-question" padding="sm">
                <EditableParagraph id="para-jump-question" blockId="jump-question">
                    If the frog starts at 4 and jumps 5 times, where will it land? 4 + 5 ={" "}
                    <InlineFeedback
                        varName="jumpAnswer"
                        correctValue="9"
                        position="terminal"
                        successMessage="You got it! The frog lands on 9"
                        failureMessage="Not quite."
                        hint="Start at 4 and count 5 more"
                    >
                        <InlineClozeInput
                            varName="jumpAnswer"
                            correctAnswer="9"
                            {...clozePropsFromDefinition(getVariableInfo("jumpAnswer"))}
                        />
                    </InlineFeedback>.
                </EditableParagraph>
            </Block>
        </div>
    </SplitLayout>,
];

// ─────────────────────────────────────────
// SECTION 7: Fun Finish
// ─────────────────────────────────────────
export const section7FunFinish: ReactElement[] = [
    <StackLayout key="layout-finish-heading" maxWidth="xl">
        <Block id="finish-heading" padding="md">
            <EditableH2 id="h2-finish-heading" blockId="finish-heading">
                You Did It!
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-finish-message" maxWidth="xl">
        <Block id="finish-message" padding="sm">
            <EditableParagraph id="para-finish-message" blockId="finish-message">
                Congratulations! You have learned how to add numbers together. Remember, addition is just putting things together to find out how many you have in total. Keep practicing and you will become an addition superstar!
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
    ...section5CountingChallenge,
    ...section6NumberLineJumping,
    ...section7FunFinish,
];
