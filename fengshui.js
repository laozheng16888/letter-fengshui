{\rtf1\ansi\ansicpg936\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
document.getElementById("fengshui-form").addEventListener("submit", function(event) \{\
  event.preventDefault(); // \uc0\u38450 \u27490 \u39029 \u38754 \u21047 \u26032 \
  const name = document.getElementById("fullname").value;\
  const birthdate = document.getElementById("birthdate").value;\
  const birthtime = document.getElementById("birthtime").value;\
  const birthplace = document.getElementById("birthplace").value;\
\
  // \uc0\u35843 \u29992 \u25490 \u30424 \u35745 \u31639 \u24182 \u36755 \u20986 \
  const baziResult = calculateBaZi(birthdate, birthtime, birthplace);\
  generateReport(baziResult, name);\
\});\
\
function calculateBaZi(birthdate, birthtime, birthplace) \{\
  const yearStems = ["\uc0\u30002 ", "\u20057 ", "\u19993 ", "\u19969 ", "\u25098 ", "\u24049 ", "\u24218 ", "\u36763 ", "\u22764 ", "\u30328 "];\
  const yearBranches = ["\uc0\u23376 ", "\u19985 ", "\u23493 ", "\u21359 ", "\u36784 ", "\u24051 ", "\u21320 ", "\u26410 ", "\u30003 ", "\u37193 ", "\u25100 ", "\u20133 "];\
  \
  const birthYear = new Date(birthdate).getFullYear();\
  const yearStemIndex = (birthYear - 4) % 10;\
  const yearBranchIndex = (birthYear - 4) % 12;\
\
  const yearStem = yearStems[yearStemIndex];\
  const yearBranch = yearBranches[yearBranchIndex];\
\
  return \{\
    year: `$\{yearStem\}$\{yearBranch\}`\
  \};\
\}\
\
function generateReport(baziResult, name) \{\
  const year = baziResult.year;\
\
  document.getElementById("report-section").innerHTML = `\
    <h2>Dear $\{name\}, here's your Feng Shui Destiny</h2>\
    <h3>Your BaZi (Four Pillars):</h3>\
    <p>Year: $\{year\}</p>\
    <h3>Today's Fortune:</h3>\
    <p>Today is a good day to focus on stability and planning ahead. Lucky direction: North.</p>\
    <h3>Personality:</h3>\
    <p>Based on your BaZi, you are a calm and strategic individual, who values stability and planning.</p>\
    <h3>Love & Relationships:</h3>\
    <p>You tend to be loyal in relationships, but sometimes you may struggle with expressing your emotions openly.</p>\
    <h3>Family:</h3>\
    <p>Family is important to you, and you play a stabilizing role in your home.</p>\
    <h3>Wealth Outlook:</h3>\
    <p>Your approach to finances is careful, preferring steady growth over high-risk ventures.</p>\
    <h3>Lucky Elements:</h3>\
    <p>Your lucky elements are Water and Metal. Favorable color: White.</p>\
    <button onclick="window.location.href='/products/full-report'">Unlock Full Detailed Report for $4.99</button>\
  `;\
\}\
}