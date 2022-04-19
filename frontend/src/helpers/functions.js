export const formattingVarVal = (v) => {
  let val = "";
  const arrayChars = v.split("");
  arrayChars.map((character, idx) => {
    if (character === character.toLowerCase()) {
      return (val += character);
    } else {
      return (val += `_${character.toLowerCase()}`);
    }
  });
  if (val.includes("i_d")) {
    return val.replace("i_d", "ID");
  }
  return val;
};

const checkCase = (ch) => {
  if (!isNaN(ch * 1)) {
    return "num";
  } else {
    if (ch === ch.toUpperCase()) {
      return "upper case";
    }
    if (ch === ch.toLowerCase()) {
      return "lower case";
    }
  }
};

export const formattingKeyField = (k) => {
  let s = "";
  const arrayChars = k.split("");
  arrayChars.map((ch) => {
    switch (checkCase(ch)) {
      case "num":
        s += ch;
        break;
      case "upper case":
        s += `_${ch.toLowerCase()}`;
        break;
      case "lower case":
        s += ch;
        break;

      default:
        break;
    }
  });
  return s;
};

// DOC - INITIAL SNIPPET
export const handleVariable = (k, obj, fn, kv = null) => {
  if (obj && !kv) {
    if (obj[k]) {
      const { [k]: removedVariable, ...variablesRest } = obj;
      fn(variablesRest);
    } else {
      obj[k] = [];
      const { ...variablesAll } = obj;
      fn(variablesAll);
    }
  } else if (obj && kv) {
    if (obj[k].find((i) => i === kv)) {
      let newAr = obj[k].filter((i) => i !== kv);
      obj[k] = [...newAr];
      const { ...variablesAll } = obj;
      fn(variablesAll);
    } else {
      obj[k].push(kv);
      const { ...variablesAll } = obj;
      fn(variablesAll);
    }
  }
};

export const formattingVariableWithDollars = (variable = "") => {
  return `$$$${variable.trim().replaceAll(" ", "_")}$$$`;
};

export const getSubChapterID = (data, wantPk = false) => {
  const chap = data?.chapter?.edges.find(
    (chapter) => chapter.node.path === "/Implementazioni"
  );
  const subChap = chap.node.subChapter.edges.find(
    (subChapter) => subChapter.node.path === "/interazioni-sul-sito"
  );
  return !wantPk ? subChap?.node.id : subChap?.node.pk;
};
