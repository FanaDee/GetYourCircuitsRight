function calculateOhm() {
    let val1 = parseFloat(document.getElementById("value1").value);
    let val2 = parseFloat(document.getElementById("value2").value);
    let type = document.getElementById("calculationType").value;
    let resultText = "";

    if (isNaN(val1) || isNaN(val2)) {
        resultText = "Please enter two values.";
    } else {
        if (type === "voltage") {
            resultText = `Voltage (V) = ${val1 * val2} V`;
        } else if (type === "current") {
            resultText = `Current (I) = ${(val1 / val2).toFixed(3)} A`;
        } else if (type === "resistance") {
            resultText = `Resistance (R) = ${(val1 / val2).toFixed(3)} Ω`;
        }
    }
    document.getElementById("result").innerText = resultText;
}

function solveKVL() {
    let input = document.getElementById("kvlequations").value.trim();
    if (!input) {
        document.getElementById("kvlResult").innerText = "Please enter equations!";
        document.getElementById("explanation").innerText = "";
        return;
    }

    let { equations, variables } = parseEquations(input);
    if (equations.length === 0) {
        document.getElementById("kvlResult").innerText = "No valid equations found!";
        document.getElementById("explanation").innerText = "";
        return;
    }

    let solution = solveEquations(equations, variables);
    if (typeof solution === "string") {
        document.getElementById("kvlResult").innerText = solution;
        document.getElementById("explanation").innerText = "";
    } else {
        let output = "Solution:\n";
        for (let [varName, value] of Object.entries(solution.result)) {
            output += `${varName} = ${value}\n`;
        }
        document.getElementById("kvlResult").innerText = output;
        document.getElementById("explanation").innerText = solution.explanation;
    }
}

// Simple circuit drawing
const canvas = document.getElementById("circuitCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!drawing) return;
    ctx.fillStyle = "white";
    ctx.fillRect(event.offsetX, event.offsetY, 2, 2);
}
