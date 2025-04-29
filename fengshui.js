document.getElementById("fengshui-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = encodeURIComponent(document.getElementById("fullname").value);
  const birthdate = encodeURIComponent(document.getElementById("birthdate").value);
  const birthtime = encodeURIComponent(document.getElementById("birthtime").value);
  const birthplace = encodeURIComponent(document.getElementById("birthplace").value);

  // 生成专属完整版报告链接
  const fullReportLink = `/pages/full-report?name=${name}&birthdate=${birthdate}&birthtime=${birthtime}&birthplace=${birthplace}`;

  window.fullReportLink = fullReportLink;

  // 调用四柱排盘
  const baziResult = calculateFourPillars(birthdate, birthtime);
  generateSimpleReport(baziResult, decodeURIComponent(name));
});

// 简单四柱推算
function calculateFourPillars(birthdate, birthtime) {
  const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  const date = new Date(birthdate + "T" + birthtime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  // 年柱
  const yearStem = stems[(year - 4) % 10];
  const yearBranch = branches[(year - 4) % 12];

  // 月柱
  const monthBranch = branches[(month + 1) % 12];
  const monthStem = stems[(month + 1) % 10];

  // 日柱
  const dayStem = stems[(day + 1) % 10];
  const dayBranch = branches[(day + 1) % 12];

  // 时柱
  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  const hourBranch = branches[hourIndex];
  const hourStem = stems[hourIndex % 10];

  return {
    year: `${yearStem}${yearBranch}`,
    month: `${monthStem}${monthBranch}`,
    day: `${dayStem}${dayBranch}`,
    hour: `${hourStem}${hourBranch}`
  };
}

// 升级版 简单报告生成
function generateSimpleReport(baziResult, name) {
  const { year, month, day, hour } = baziResult;

  const luckyElement = getLuckyElement(year, month, day, hour);

  document.getElementById("report-section").innerHTML = `
    <h2>Dear ${name}, here’s your Personalized Feng Shui Destiny</h2>
    <h3>Your Four Pillars (BaZi):</h3>
    <p>Year: ${year}, Month: ${month}, Day: ${day}, Hour: ${hour}</p>

    <h3>Personality:</h3>
    <p>${luckyElement.personalityStrength}</p>
    <p>${luckyElement.personalityWeakness}</p>
    <p>${luckyElement.personalityAdvice}</p>

    <h3>Love & Relationships:</h3>
    <p>${luckyElement.loveStrength}</p>
    <p>${luckyElement.loveChallenge}</p>
    <p>${luckyElement.loveAdvice}</p>

    <h3>Family:</h3>
    <p>${luckyElement.familyStrength}</p>
    <p>${luckyElement.familyPotentialIssue}</p>
    <p>${luckyElement.familyAdvice}</p>

    <h3>Wealth Outlook:</h3>
    <p>${luckyElement.wealthOpportunity}</p>
    <p>${luckyElement.wealthRisk}</p>
    <p>${luckyElement.wealthAdvice}</p>

    <div style="margin-top:30px; padding:20px; background:#fdf7e3; border-radius:12px; text-align:center;">
      <p><strong>Unlock your Full Feng Shui Destiny Report to discover deeper insights, personalized enhancement strategies, and timing for your luck cycles!</strong></p>
      <button onclick="redirectToPayment()" style="margin-top:20px; padding:12px 24px; background-color:#c7a76c; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer;">Unlock Full Report for $4.99</button>
    </div>
  `;
}

// 简单五行运势示例（可以以后扩展成更复杂）
function getLuckyElement(year, month, day, hour) {
  const elements = [
    {
      personalityStrength: "You are vibrant, sociable, and naturally attract positive attention.",
      personalityWeakness: "However, you may sometimes overlook critical details in your enthusiasm.",
      personalityAdvice: "Balancing spontaneity with careful planning will enhance your personal growth.",
      
      loveStrength: "You build warm and genuine emotional connections.",
      loveChallenge: "At times, emotional impulsiveness could cause misunderstandings.",
      loveAdvice: "Practicing mindful communication will deepen your bonds.",

      familyStrength: "Your optimism uplifts your family and strengthens the home.",
      familyPotentialIssue: "Unspoken expectations may lead to minor tensions.",
      familyAdvice: "Regular open conversations will preserve harmony.",

      wealthOpportunity: "Your dynamic energy opens doors to new financial opportunities.",
      wealthRisk: "A tendency toward impulsiveness may risk unstable investments.",
      wealthAdvice: "Maintaining a strategic financial plan will secure your future prosperity."
    },
    {
      personalityStrength: "You are methodical, resilient, and deeply dependable.",
      personalityWeakness: "Yet, excessive caution may sometimes limit your opportunities.",
      personalityAdvice: "Cultivating courage to seize opportunities will empower you further.",
      
      loveStrength: "Loyal and steady, your relationships are built on trust.",
      loveChallenge: "Overthinking may create unnecessary emotional distance.",
      loveAdvice: "Staying emotionally open will sustain your intimacy.",

      familyStrength: "You provide a strong backbone of support to your family.",
      familyPotentialIssue: "Overcommitment to duties may cause self-neglect.",
      familyAdvice: "Balancing personal needs with responsibilities strengthens family bonds.",

      wealthOpportunity: "Stable investment opportunities will naturally come your way.",
      wealthRisk: "Missed chances due to hesitancy could delay financial growth.",
      wealthAdvice: "Timely decisions backed by careful analysis will bring success."
    }
  ];

  const randomIndex = (year.charCodeAt(0) + month.charCodeAt(0) + day.charCodeAt(0) + hour.charCodeAt(0)) % elements.length;
  return elements[randomIndex];
}

// 跳转到付费购买页面
function redirectToPayment() {
  window.location.href = `/products/full-fengshui-destiny-report?redirect=${encodeURIComponent(window.fullReportLink)}`;
}
