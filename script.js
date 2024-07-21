// Input elements
const useNumbers = document.getElementById("useNumbers");
const useSymbols = document.getElementById("useSymbols");
const easyToRead = document.getElementById("easyToRead");

// Setup slider
const lengthRange = document.getElementById("lengthRange");
const lengthOutput = document.getElementById("lengthOutput");

// Output elements
const passwordOutput = document.getElementById("passwordOutput");
const generatePassword = document.getElementById("generatePassword");
const copyPassword = document.getElementById("copyPassword");
const successfullyCopied = document.getElementById("successfullyCopied");


lengthOutput.value = lengthRange.value;
lengthRange.oninput = () => {
    lengthOutput.value = lengthRange.value;
    generatePasswordCallback();
};
generatePasswordCallback();

generatePassword.onclick = generatePasswordCallback;
useNumbers.onchange = generatePasswordCallback;
useSymbols.onchange = generatePasswordCallback;
easyToRead.onchange = generatePasswordCallback;

copyPassword.onclick = () => {
    passwordOutput.select();
    
    navigator.clipboard.writeText(passwordOutput.value).then(() => {
        successfullyCopied.style.display = "inline-block";
        setTimeout(() => {
            successfullyCopied.style.display = "none";
        }
        , 2000);
    });
};

function generatePasswordCallback() {

    let lenght = lengthRange.value;
    let useNumbersValue = useNumbers.checked;
    let useSymbolsValue = useSymbols.checked;
    let easyToReadValue = easyToRead.checked;

    passwordOutput.value = buildPassword(
        lenght,
        useNumbersValue,
        useSymbolsValue,
        easyToReadValue
    );
};

function buildPassword(
    lenght,
    useNumbers,
    useSymbols,
    easyToRead,
) {
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const hardToRead = ["l", "I", "1", "o", "O", "0"];
    

    let chars = lowercase + uppercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    if (easyToRead) {
        chars = chars.split("").filter((char) => !hardToRead.includes(char)).join("");
    }

    let password = "";

    for (let i = 0; i < lenght; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}