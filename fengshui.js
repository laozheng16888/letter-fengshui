document.getElementById("fengshui-form").addEventListener("submit", function(event) {
  event.preventDefault(); // 防止页面刷新
  const name = document.getElementById("fullname").value;
  const birthdate = document.getElementById("birthdate").value;
  const birthtime = document.getElementById("birthtime").value;
  const birthplace = document.getElementById("birthplace").value;

  // 调用排盘计算并输出
  const baziResult = calculateBaZi(birthdate, birthtime, birthplace);
  generateReport(baziResult, name);
});

function calculateBaZi(birthdate, birthtime, birthplace) {
  const yearStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const yearBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  
  const birthYear = new Date(birthdate).getFullYear();
  const yearStemIndex = (birthYear - 4) % 10;
  const yearBranchIndex = (birthYear - 4) % 12;

  const yearStem = yearStems[yearStemIndex];
  const yearBranch = yearBranches[yearBranchIndex];

  return {
    year: `${yearStem}${yearBranch}`
  };
}

function generateReport(baziResult, name) {
  const year = baziResult.year;

  document.getElementById("report-section").innerHTML = `
    <h2>Dear ${name}, here's your Feng Shui Destiny</h2>
    <h3>Your BaZi (Four Pillars):</h3>
    <p>Year: ${year}</p>
    <h3>Today's Fortune:</h3>
    <p>Today is a good day to focus on stability and planning ahead. Lucky direction: North.</p>
    <h3>Personality:</h3>
    <p>Based on your BaZi, you are a calm and strategic individual, who values stability and planning.</p>
    <h3>Love & Relationships:</h3>
    <p>You tend to be loyal in relationships, but sometimes you may struggle with expressing your emotions openly.</p>
    <h3>Family:</h3>
    <p>Family is important to you, and you play a stabilizing role in your home.</p>
    <h3>Wealth Outlook:</h3>
    <p>Your approach to finances is careful, preferring steady growth over high-risk ventures.</p>
    <h3>Lucky Elements:</h3>
    <p>Your lucky elements are Water and Metal. Favorable color: White.</p>
    <button onclick="window.location.href='/products/full-report'">Unlock Full Detailed Report for $4.99</button>
  `;
}
