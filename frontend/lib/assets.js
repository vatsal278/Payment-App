/**
 * Asset reference data + Alpaca API helpers.
 *
 * Static data (icons, colors, names) stays here.
 * All price / holdings / trading data now comes from
 * the backend via Alpaca.
 */

export const BITCOIN_DATA = {
  symbol: "BTC/USD",
  alpacaSymbol: "BTCUSD", // for position lookup
  name: "Bitcoin",
  icon: "₿",
  color: "#F7931A",
};

export const CRYPTOS = [
  {
    symbol: "BTC/USD",
    alpacaSymbol: "BTCUSD",
    name: "Bitcoin",
    icon: "₿",
    color: "#F7931A",
    coingeckoId: "bitcoin",
    logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    symbol: "ETH/USD",
    alpacaSymbol: "ETHUSD",
    name: "Ethereum",
    icon: "♦",
    color: "#627EEA",
    coingeckoId: "ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    symbol: "LTC/USD",
    alpacaSymbol: "LTCUSD",
    name: "Litecoin",
    icon: "Ł",
    color: "#345D9D",
    coingeckoId: "litecoin",
    logo: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
  },
  {
    symbol: "BCH/USD",
    alpacaSymbol: "BCHUSD",
    name: "Bitcoin Cash",
    icon: "₿",
    color: "#8DC351",
    coingeckoId: "bitcoin-cash",
    logo: "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png",
  },
  {
    symbol: "LINK/USD",
    alpacaSymbol: "LINKUSD",
    name: "Chainlink",
    icon: "🔗",
    color: "#2A5ADA",
    coingeckoId: "chainlink",
    logo: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
  },
  {
    symbol: "UNI/USD",
    alpacaSymbol: "UNIUSD",
    name: "Uniswap",
    icon: "🦄",
    color: "#FF007A",
    coingeckoId: "uniswap",
    logo: "https://assets.coingecko.com/coins/images/12504/large/uni.jpg",
  },
];

export const STOCKS = [
  {
    symbol: "AAPL",
    name: "Apple",
    icon: "🍎",
    color: "#555555",
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    icon: "🪟",
    color: "#00A4EF",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    icon: "🟢",
    color: "#76B900",
    logo: "https://logo.clearbit.com/nvidia.com",
  },
  {
    symbol: "AMZN",
    name: "Amazon",
    icon: "📦",
    color: "#FF9900",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    icon: "♾️",
    color: "#0080FB",
    logo: "https://logo.clearbit.com/meta.com",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet (Google)",
    icon: "🔍",
    color: "#4285F4",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    icon: "⚡",
    color: "#E31937",
    logo: "https://logo.clearbit.com/tesla.com",
  },
  {
    symbol: "BRK.B",
    name: "Berkshire Hathaway",
    icon: "🏢",
    color: "#000000",
    logo: "https://logo.clearbit.com/berkshirehathaway.com",
  },
  {
    symbol: "AVGO",
    name: "Broadcom",
    icon: "🔴",
    color: "#CC0000",
    logo: "https://logo.clearbit.com/broadcom.com",
  },
  {
    symbol: "LLY",
    name: "Eli Lilly",
    icon: "💊",
    color: "#D11920",
    logo: "https://logo.clearbit.com/lilly.com",
  },
  {
    symbol: "V",
    name: "Visa",
    icon: "💳",
    color: "#1A1F71",
    logo: "https://logo.clearbit.com/visa.com",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    icon: "🏦",
    color: "#000000",
    logo: "https://logo.clearbit.com/jpmorganchase.com",
  },
  {
    symbol: "UNH",
    name: "UnitedHealth",
    icon: "🩺",
    color: "#003A70",
    logo: "https://logo.clearbit.com/unitedhealthgroup.com",
  },
  {
    symbol: "XOM",
    name: "Exxon Mobil",
    icon: "🛢️",
    color: "#D8232A",
    logo: "https://logo.clearbit.com/exxonmobil.com",
  },
  {
    symbol: "MA",
    name: "Mastercard",
    icon: "💳",
    color: "#EB001B",
    logo: "https://logo.clearbit.com/mastercard.com",
  },
  {
    symbol: "PG",
    name: "Procter & Gamble",
    icon: "🧼",
    color: "#003DA5",
    logo: "https://logo.clearbit.com/pg.com",
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    icon: "🩹",
    color: "#C8102E",
    logo: "https://logo.clearbit.com/jnj.com",
  },
  {
    symbol: "HD",
    name: "Home Depot",
    icon: "🔨",
    color: "#F96302",
    logo: "https://logo.clearbit.com/homedepot.com",
  },
  {
    symbol: "MRK",
    name: "Merck",
    icon: "🔬",
    color: "#00A3E0",
    logo: "https://logo.clearbit.com/merck.com",
  },
  {
    symbol: "ABBV",
    name: "AbbVie",
    icon: "🧪",
    color: "#000000",
    logo: "https://logo.clearbit.com/abbvie.com",
  },
  {
    symbol: "CVX",
    name: "Chevron",
    icon: "⛽",
    color: "#0054A4",
    logo: "https://logo.clearbit.com/chevron.com",
  },
  {
    symbol: "CRM",
    name: "Salesforce",
    icon: "☁️",
    color: "#00A1E0",
    logo: "https://logo.clearbit.com/salesforce.com",
  },
  {
    symbol: "AMD",
    name: "AMD",
    icon: "💻",
    color: "#000000",
    logo: "https://logo.clearbit.com/amd.com",
  },
  {
    symbol: "PEP",
    name: "PepsiCo",
    icon: "🥤",
    color: "#004B93",
    logo: "https://logo.clearbit.com/pepsico.com",
  },
  {
    symbol: "KO",
    name: "Coca-Cola",
    icon: "🥤",
    color: "#F40000",
    logo: "https://logo.clearbit.com/coca-cola.com",
  },
  {
    symbol: "BAC",
    name: "Bank of America",
    icon: "🏛️",
    color: "#012169",
    logo: "https://logo.clearbit.com/bankofamerica.com",
  },
  {
    symbol: "TMO",
    name: "Thermo Fisher",
    icon: "🧬",
    color: "#000000",
    logo: "https://logo.clearbit.com/thermofisher.com",
  },
  {
    symbol: "COST",
    name: "Costco",
    icon: "🛒",
    color: "#E31837",
    logo: "https://logo.clearbit.com/costco.com",
  },
  {
    symbol: "WMT",
    name: "Walmart",
    icon: "🏪",
    color: "#0071CE",
    logo: "https://logo.clearbit.com/walmart.com",
  },
  {
    symbol: "MCD",
    name: "McDonald's",
    icon: "🍟",
    color: "#FFC72C",
    logo: "https://logo.clearbit.com/mcdonalds.com",
  },
  {
    symbol: "DIS",
    name: "Disney",
    icon: "🏰",
    color: "#113CCF",
    logo: "https://logo.clearbit.com/disney.com",
  },
  {
    symbol: "ABT",
    name: "Abbott",
    icon: "🏥",
    color: "#0093D0",
    logo: "https://logo.clearbit.com/abbott.com",
  },
  {
    symbol: "CSCO",
    name: "Cisco",
    icon: "🌐",
    color: "#1BA0D7",
    logo: "https://logo.clearbit.com/cisco.com",
  },
  {
    symbol: "INTU",
    name: "Intuit",
    icon: "📊",
    color: "#365EBF",
    logo: "https://logo.clearbit.com/intuit.com",
  },
  {
    symbol: "NFLX",
    name: "Netflix",
    icon: "🍿",
    color: "#E50914",
    logo: "https://logo.clearbit.com/netflix.com",
  },
  {
    symbol: "NKE",
    name: "Nike",
    icon: "👟",
    color: "#000000",
    logo: "https://logo.clearbit.com/nike.com",
  },
  {
    symbol: "IBM",
    name: "IBM",
    icon: "🖥️",
    color: "#0F62FE",
    logo: "https://logo.clearbit.com/ibm.com",
  },
  {
    symbol: "ORCL",
    name: "Oracle",
    icon: "💾",
    color: "#F80000",
    logo: "https://logo.clearbit.com/oracle.com",
  },
  {
    symbol: "CMCSA",
    name: "Comcast",
    icon: "📡",
    color: "#000000",
    logo: "https://logo.clearbit.com/comcast.com",
  },
  {
    symbol: "VZ",
    name: "Verizon",
    icon: "📱",
    color: "#CD040B",
    logo: "https://logo.clearbit.com/verizon.com",
  },
  {
    symbol: "QCOM",
    name: "Qualcomm",
    icon: "📱",
    color: "#3253AD",
    logo: "https://logo.clearbit.com/qualcomm.com",
  },
  {
    symbol: "TXN",
    name: "Texas Instruments",
    icon: "🔌",
    color: "#CC0000",
    logo: "https://logo.clearbit.com/ti.com",
  },
  {
    symbol: "PFE",
    name: "Pfizer",
    icon: "💊",
    color: "#0000FF",
    logo: "https://logo.clearbit.com/pfizer.com",
  },
  {
    symbol: "GE",
    name: "General Electric",
    icon: "⚙️",
    color: "#005EAD",
    logo: "https://logo.clearbit.com/ge.com",
  },
  {
    symbol: "WFC",
    name: "Wells Fargo",
    icon: "💳",
    color: "#CD1409",
    logo: "https://logo.clearbit.com/wellsfargo.com",
  },
  {
    symbol: "NOW",
    name: "ServiceNow",
    icon: "☁️",
    color: "#293E40",
    logo: "https://logo.clearbit.com/servicenow.com",
  },
  {
    symbol: "UNP",
    name: "Union Pacific",
    icon: "🚂",
    color: "#005587",
    logo: "https://logo.clearbit.com/up.com",
  },
  {
    symbol: "BA",
    name: "Boeing",
    icon: "✈️",
    color: "#1D439C",
    logo: "https://logo.clearbit.com/boeing.com",
  },
  {
    symbol: "UPS",
    name: "UPS",
    icon: "📦",
    color: "#351C15",
    logo: "https://logo.clearbit.com/ups.com",
  },
  {
    symbol: "PM",
    name: "Philip Morris",
    icon: "🚬",
    color: "#000000",
    logo: "https://logo.clearbit.com/pmi.com",
  },
];

/**
 * Map a UI time-range label to Alpaca bar params.
 * Returns { timeframe, start (ISO string), limit }
 */
export function getBarParams(range) {
  const now = new Date();
  let start, timeframe, limit;

  switch (range) {
    case "1D":
      start = new Date(now);
      start.setDate(now.getDate() - 1);
      timeframe = "15Min";
      limit = 96;
      break;
    case "1W":
      start = new Date(now);
      start.setDate(now.getDate() - 7);
      timeframe = "1Hour";
      limit = 168;
      break;
    case "1M":
      start = new Date(now);
      start.setMonth(now.getMonth() - 1);
      timeframe = "1Day";
      limit = 30;
      break;
    case "1Y":
      start = new Date(now);
      start.setFullYear(now.getFullYear() - 1);
      timeframe = "1Day";
      limit = 365;
      break;
    case "ALL":
      start = new Date(now);
      start.setFullYear(now.getFullYear() - 5);
      timeframe = "1Week";
      limit = 260;
      break;
    default:
      start = new Date(now);
      start.setDate(now.getDate() - 1);
      timeframe = "15Min";
      limit = 96;
  }

  return { timeframe, start: start.toISOString(), limit };
}

/**
 * Get detailed company info for a stock.
 */
export function getCompanyInfo(symbol, name) {
  const known = {
    AAPL: {
      ceo: "Tim Cook",
      employees: "161,000",
      hq: "Cupertino, CA",
      about:
        "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    },
    MSFT: {
      ceo: "Satya Nadella",
      employees: "221,000",
      hq: "Redmond, WA",
      about:
        "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
    },
    TSLA: {
      ceo: "Elon Musk",
      employees: "127,855",
      hq: "Austin, TX",
      about:
        "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.",
    },
    NVDA: {
      ceo: "Jensen Huang",
      employees: "26,196",
      hq: "Santa Clara, CA",
      about:
        "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally.",
    },
    AMZN: {
      ceo: "Andy Jassy",
      employees: "1,541,000",
      hq: "Seattle, WA",
      about:
        "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.",
    },
    META: {
      ceo: "Mark Zuckerberg",
      employees: "86,482",
      hq: "Menlo Park, CA",
      about:
        "Meta Platforms, Inc. engages in the development of products that enable people to connect and share with friends and family.",
    },
    GOOGL: {
      ceo: "Sundar Pichai",
      employees: "190,234",
      hq: "Mountain View, CA",
      about:
        "Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.",
    },
  };
  if (known[symbol]) return known[symbol];

  // Fallback for the remaining top 50
  return {
    ceo: `CEO of ${name}`,
    employees: `${Math.floor(Math.random() * 100) + 10},000+`,
    hq: "United States",
    about: `${name} is a leading publicly traded company listed on the US stock exchange, providing innovative products and services globally.`,
  };
}
