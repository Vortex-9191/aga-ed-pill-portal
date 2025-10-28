export const stationMap: Record<string, { ja: string; prefecture: string; lines: string[] }> = {
  // 東京都
  mitaka: { ja: "三鷹駅", prefecture: "東京都", lines: ["JR中央線", "JR総武線"] },
  shibuya: { ja: "渋谷駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ銀座線", "東京メトロ半蔵門線"] },
  shinjuku: { ja: "新宿駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ丸ノ内線"] },
  ikebukuro: { ja: "池袋駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ丸ノ内線", "東京メトロ有楽町線"] },
  tokyo: { ja: "東京駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ丸ノ内線"] },
  shinagawa: { ja: "品川駅", prefecture: "東京都", lines: ["JR山手線", "JR東海道本線", "京急本線"] },
  ueno: { ja: "上野駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "東京メトロ銀座線"] },
  akihabara: { ja: "秋葉原駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ日比谷線"] },
  roppongi: { ja: "六本木駅", prefecture: "東京都", lines: ["東京メトロ日比谷線", "都営大江戸線"] },
  ebisu: { ja: "恵比寿駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ日比谷線"] },
  meguro: { ja: "目黒駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ南北線", "都営三田線"] },
  gotanda: { ja: "五反田駅", prefecture: "東京都", lines: ["JR山手線", "都営浅草線", "東急池上線"] },
  osaki: { ja: "大崎駅", prefecture: "東京都", lines: ["JR山手線", "りんかい線"] },
  tamachi: { ja: "田町駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線"] },
  hamamatsucho: { ja: "浜松町駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "東京モノレール"] },
  shimbashi: { ja: "新橋駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ銀座線", "都営浅草線"] },
  yurakucho: { ja: "有楽町駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "東京メトロ有楽町線"] },
  kanda: { ja: "神田駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "東京メトロ銀座線"] },
  nippori: { ja: "日暮里駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線", "京成本線"] },
  uguisudani: { ja: "鶯谷駅", prefecture: "東京都", lines: ["JR山手線"] },
  tabata: { ja: "田端駅", prefecture: "東京都", lines: ["JR山手線", "JR京浜東北線"] },
  komagome: { ja: "駒込駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ南北線"] },
  sugamo: { ja: "巣鴨駅", prefecture: "東京都", lines: ["JR山手線", "都営三田線"] },
  otsuka: { ja: "大塚駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ丸ノ内線"] },
  mejiro: { ja: "目白駅", prefecture: "東京都", lines: ["JR山手線"] },
  takadanobaba: { ja: "高田馬場駅", prefecture: "東京都", lines: ["JR山手線", "東京メトロ東西線", "西武新宿線"] },
  shinjukugyoenmae: { ja: "新宿御苑前駅", prefecture: "東京都", lines: ["東京メトロ丸ノ内線"] },
  yoyogi: { ja: "代々木駅", prefecture: "東京都", lines: ["JR山手線", "JR中央線", "都営大江戸線"] },
  harajuku: { ja: "原宿駅", prefecture: "東京都", lines: ["JR山手線"] },
  sangenjaya: { ja: "三軒茶屋駅", prefecture: "東京都", lines: ["東急田園都市線", "東急世田谷線"] },
  shimokitazawa: { ja: "下北沢駅", prefecture: "東京都", lines: ["小田急小田原線", "京王井の頭線"] },
  nakameguro: { ja: "中目黒駅", prefecture: "東京都", lines: ["東京メトロ日比谷線", "東急東横線"] },
  nakano: { ja: "中野駅", prefecture: "東京都", lines: ["JR中央線", "東京メトロ東西線"] },
  kameido: { ja: "亀戸駅", prefecture: "東京都", lines: ["JR総武線"] },
  kudanshita: { ja: "九段下駅", prefecture: "東京都", lines: ["東京メトロ東西線", "都営新宿線", "東京メトロ半蔵門線"] },
  kameari: { ja: "亀有駅", prefecture: "東京都", lines: ["JR常磐線"] },
  ningyocho: { ja: "人形町駅", prefecture: "東京都", lines: ["東京メトロ日比谷線", "都営浅草線"] },
  tokiwadai: { ja: "ときわ台駅", prefecture: "東京都", lines: ["東武東上線"] },
  keiohachioji: { ja: "京王八王子駅", prefecture: "東京都", lines: ["京王線"] },
  sengawa: { ja: "仙川駅", prefecture: "東京都", lines: ["京王線"] },
  tsutsujigaoka: { ja: "つつじケ丘駅", prefecture: "東京都", lines: ["京王線"] },
  hibarigaoka: { ja: "ひばりケ丘駅", prefecture: "東京都", lines: ["西武池袋線"] },
  kumegawa: { ja: "久米川駅", prefecture: "東京都", lines: ["西武新宿線"] },
  keiokamata: { ja: "京急蒲田駅", prefecture: "東京都", lines: ["京急本線", "京急空港線"] },

  // 渋谷区周辺の駅を追加
  meijijingumae: { ja: "明治神宮前〈原宿〉駅", prefecture: "東京都", lines: ["東京メトロ千代田線", "東京メトロ副都心線"] },
  omotesando: { ja: "表参道駅", prefecture: "東京都", lines: ["東京メトロ銀座線", "東京メトロ千代田線", "東京メトロ半蔵門線"] },
  yoyogiuehara: { ja: "代々木上原駅", prefecture: "東京都", lines: ["小田急小田原線", "東京メトロ千代田線"] },
  yoyogikoen: { ja: "代々木公園駅", prefecture: "東京都", lines: ["東京メトロ千代田線"] },
  daikanyama: { ja: "代官山駅", prefecture: "東京都", lines: ["東急東横線"] },
  hatsudai: { ja: "初台駅", prefecture: "東京都", lines: ["京王新線"] },
  kitasando: { ja: "北参道駅", prefecture: "東京都", lines: ["東京メトロ副都心線"] },
  sendagaya: { ja: "千駄ケ谷駅", prefecture: "東京都", lines: ["JR中央・総武線"] },
  sangubashi: { ja: "参宮橋駅", prefecture: "東京都", lines: ["小田急小田原線"] },
  hatagaya: { ja: "幡ヶ谷駅", prefecture: "東京都", lines: ["京王新線"] },
  hiroo: { ja: "広尾駅", prefecture: "東京都", lines: ["東京メトロ日比谷線"] },
  shinsen: { ja: "神泉駅", prefecture: "東京都", lines: ["京王井の頭線"] },
  sasazuka: { ja: "笹塚駅", prefecture: "東京都", lines: ["京王線", "京王新線"] },
  mita: { ja: "三田駅", prefecture: "東京都", lines: ["都営三田線", "都営浅草線"] },
  machida: { ja: "町田駅", prefecture: "東京都", lines: ["JR横浜線", "小田急小田原線"] },
  kokubunji: { ja: "国分寺駅", prefecture: "東京都", lines: ["JR中央線", "JR武蔵野線", "西武国分寺線"] },
  hachiioji: { ja: "八王子駅", prefecture: "東京都", lines: ["JR中央線", "JR横浜線", "JR八高線"] },
  iidabashi: { ja: "飯田橋駅", prefecture: "東京都", lines: ["JR中央線", "東京メトロ東西線", "東京メトロ有楽町線"] },
  koenjiminami: { ja: "高円寺駅", prefecture: "東京都", lines: ["JR中央線"] },
  kamata: { ja: "蒲田駅", prefecture: "東京都", lines: ["JR京浜東北線", "東急池上線", "東急多摩川線"] },
  ochanomizu: { ja: "御茶ノ水駅", prefecture: "東京都", lines: ["JR中央線", "東京メトロ丸ノ内線", "東京メトロ千代田線"] },
  nihonbashi: { ja: "日本橋駅", prefecture: "東京都", lines: ["東京メトロ銀座線", "東京メトロ東西線", "東京メトロ半蔵門線"] },
  tachikawa: { ja: "立川駅", prefecture: "東京都", lines: ["JR中央線", "JR南武線", "JR青梅線"] },
  ginza: { ja: "銀座駅", prefecture: "東京都", lines: ["東京メトロ銀座線", "東京メトロ丸ノ内線", "東京メトロ日比谷線"] },
  asagaya: { ja: "阿佐ケ谷駅", prefecture: "東京都", lines: ["JR中央線"] },
  kinshicho: { ja: "錦糸町駅", prefecture: "東京都", lines: ["JR総武線", "東京メトロ半蔵門線"] },
  toranomon: { ja: "虎ノ門駅", prefecture: "東京都", lines: ["東京メトロ銀座線"] },
  kyodo: { ja: "経堂駅", prefecture: "東京都", lines: ["小田急小田原線"] },
  jiyugaoka: { ja: "自由が丘駅", prefecture: "東京都", lines: ["東急東横線", "東急大井町線"] },
  mizonokuchi: { ja: "溝の口駅", prefecture: "東京都", lines: ["JR南武線", "東急田園都市線"] },
  kasukabe: { ja: "春日部駅", prefecture: "埼玉県", lines: ["東武伊勢崎線", "東武野田線"] },
  akasaka: { ja: "赤坂駅", prefecture: "東京都", lines: ["東京メトロ千代田線"] },
  tsurumi: { ja: "鶴見駅", prefecture: "神奈川県", lines: ["JR京浜東北線", "JR鶴見線"] },
  amagasaki: { ja: "尼崎駅", prefecture: "兵庫県", lines: ["JR東海道本線", "JR福知山線"] },
  youga: { ja: "用賀駅", prefecture: "東京都", lines: ["東急田園都市線"] },
  ookayama: { ja: "大岡山駅", prefecture: "東京都", lines: ["東急目黒線", "東急大井町線"] },

  // 神奈川県
  yokohama: { ja: "横浜駅", prefecture: "神奈川県", lines: ["JR東海道本線", "JR横須賀線", "東急東横線"] },
  motomachi: { ja: "元町駅", prefecture: "神奈川県", lines: ["東急東横線"] },
  motosumiyoshi: { ja: "元住吉駅", prefecture: "神奈川県", lines: ["東急東横線"] },
  kawasaki: { ja: "川崎駅", prefecture: "神奈川県", lines: ["JR東海道本線", "JR京浜東北線"] },
  centersouth: { ja: "センター南駅", prefecture: "神奈川県", lines: ["横浜市営地下鉄ブルーライン", "横浜市営地下鉄グリーンライン"] },
  kamioooka: { ja: "上大岡駅", prefecture: "神奈川県", lines: ["京急本線", "横浜市営地下鉄ブルーライン"] },
  centernorth: { ja: "センター北駅", prefecture: "神奈川県", lines: ["横浜市営地下鉄ブルーライン", "横浜市営地下鉄グリーンライン"] },
  chuorinkan: { ja: "中央林間駅", prefecture: "神奈川県", lines: ["小田急江ノ島線", "東急田園都市線"] },
  futamatagawa: { ja: "二俣川駅", prefecture: "神奈川県", lines: ["相鉄本線", "相鉄いずみ野線"] },
  tamaplacenter: { ja: "たまプラーザ駅", prefecture: "神奈川県", lines: ["東急田園都市線"] },
  mitsukyo: { ja: "三ツ境駅", prefecture: "神奈川県", lines: ["相鉄本線"] },
  azamino: { ja: "あざみ野駅", prefecture: "神奈川県", lines: ["東急田園都市線", "横浜市営地下鉄ブルーライン"] },
  isezakicho: { ja: "伊勢佐木長者町駅", prefecture: "神奈川県", lines: ["横浜市営地下鉄ブルーライン"] },
  hodogaya: { ja: "保土ケ谷駅", prefecture: "神奈川県", lines: ["JR横須賀線"] },
  isehara: { ja: "伊勢原駅", prefecture: "神奈川県", lines: ["小田急小田原線"] },
  hiratsuka: { ja: "平塚駅", prefecture: "神奈川県", lines: ["JR東海道本線"] },
  atsugi: { ja: "厚木駅", prefecture: "神奈川県", lines: ["小田急小田原線"] },
  honatsugi: { ja: "本厚木駅", prefecture: "神奈川県", lines: ["小田急小田原線"] },
  fujisawa: { ja: "藤沢駅", prefecture: "神奈川県", lines: ["JR東海道本線", "小田急江ノ島線", "江ノ島電鉄"] },
  sagamiono: { ja: "相模大野駅", prefecture: "神奈川県", lines: ["小田急小田原線", "小田急江ノ島線"] },
  shinyokohama: { ja: "新横浜駅", prefecture: "神奈川県", lines: ["JR東海道新幹線", "JR横浜線", "横浜市営地下鉄ブルーライン"] },
  totsuka: { ja: "戸塚駅", prefecture: "神奈川県", lines: ["JR東海道本線", "JR横須賀線", "横浜市営地下鉄ブルーライン"] },
  chigasaki: { ja: "茅ケ崎駅", prefecture: "神奈川県", lines: ["JR東海道本線", "JR相模線"] },
  okubo: { ja: "大久保駅", prefecture: "神奈川県", lines: ["JR中央線"] },
  oohashi: { ja: "大橋駅", prefecture: "東京都", lines: ["東急田園都市線"] },

  // 大阪府
  kyobashi: { ja: "京橋駅", prefecture: "大阪府", lines: ["JR大阪環状線", "JR東西線", "京阪本線"] },
  mikunigaoka: { ja: "三国ケ丘駅", prefecture: "大阪府", lines: ["南海高野線", "JR阪和線"] },
  sumiyoshi: { ja: "住吉駅", prefecture: "大阪府", lines: ["南海本線", "南海高野線"] },
  nakatsu: { ja: "中津駅", prefecture: "大阪府", lines: ["大阪メトロ御堂筋線", "阪急京都線"] },
  namba: { ja: "なんば駅", prefecture: "大阪府", lines: ["南海本線", "大阪メトロ御堂筋線"] },
  osaka: { ja: "大阪駅", prefecture: "大阪府", lines: ["JR東海道本線", "JR大阪環状線"] },
  umeda: { ja: "梅田駅", prefecture: "大阪府", lines: ["阪急神戸線", "阪急宝塚線", "阪急京都線"] },
  osakaumeda: { ja: "大阪梅田駅", prefecture: "大阪府", lines: ["阪急神戸線", "阪急宝塚線", "阪急京都線"] },
  tennoji: { ja: "天王寺駅", prefecture: "大阪府", lines: ["JR大阪環状線", "JR阪和線", "大阪メトロ御堂筋線"] },
  uehommachi: { ja: "上本町駅", prefecture: "大阪府", lines: ["近鉄大阪線", "近鉄奈良線"] },
  kujo: { ja: "九条駅", prefecture: "大阪府", lines: ["大阪メトロ中央線", "阪神なんば線"] },
  juso: { ja: "十三駅", prefecture: "大阪府", lines: ["阪急京都線", "阪急宝塚線", "阪急神戸線"] },
  takatsuki: { ja: "高槻駅", prefecture: "大阪府", lines: ["JR東海道本線"] },
  ibarakishi: { ja: "茨木市駅", prefecture: "大阪府", lines: ["阪急京都線"] },
  minamimorimacho: { ja: "南森町駅", prefecture: "大阪府", lines: ["大阪メトロ堺筋線", "大阪メトロ谷町線"] },
  izumifuchu: { ja: "和泉府中駅", prefecture: "大阪府", lines: ["JR阪和線"] },
  okamachi: { ja: "岡町駅", prefecture: "大阪府", lines: ["阪急宝塚線"] },

  // 愛知県
  nagoya: { ja: "名古屋駅", prefecture: "愛知県", lines: ["JR東海道本線", "JR中央本線", "名古屋市営地下鉄東山線"] },
  imaike: { ja: "今池駅", prefecture: "愛知県", lines: ["名古屋市営地下鉄東山線", "名古屋市営地下鉄桜通線"] },
  kamiiida: { ja: "上飯田駅", prefecture: "愛知県", lines: ["名古屋市営地下鉄上飯田線", "名鉄小牧線"] },
  issya: { ja: "一社駅", prefecture: "愛知県", lines: ["名古屋市営地下鉄東山線"] },
  kawana: { ja: "川名駅", prefecture: "愛知県", lines: ["名古屋市営地下鉄鶴舞線"] },

  // 福岡県
  hakata: { ja: "博多駅", prefecture: "福岡県", lines: ["JR鹿児島本線", "福岡市地下鉄空港線"] },
  tenjin: { ja: "天神駅", prefecture: "福岡県", lines: ["福岡市地下鉄空港線", "福岡市地下鉄七隈線"] },
  saga: { ja: "佐賀駅", prefecture: "佐賀県", lines: ["JR長崎本線", "JR唐津線"] },
  buscenter: { ja: "バスセンター前駅", prefecture: "福岡県", lines: ["福岡市地下鉄空港線"] },
  gunjinmachi: { ja: "健軍町駅", prefecture: "熊本県", lines: ["熊本市電"] },
  futsukaichi: { ja: "二日市駅", prefecture: "福岡県", lines: ["西鉄天神大牟田線"] },
  imajuku: { ja: "今宿駅", prefecture: "福岡県", lines: ["JR筑肥線", "福岡市地下鉄空港線"] },

  // 北海道
  sapporo: { ja: "札幌駅", prefecture: "北海道", lines: ["JR函館本線", "札幌市営地下鉄南北線"] },
  sapporoeki: { ja: "さっぽろ駅", prefecture: "北海道", lines: ["札幌市営地下鉄南北線", "札幌市営地下鉄東豊線", "札幌市営地下鉄東西線"] },
  odori: { ja: "大通駅", prefecture: "北海道", lines: ["札幌市営地下鉄南北線", "札幌市営地下鉄東西線", "札幌市営地下鉄東豊線"] },
  goryokaku: { ja: "五稜郭駅", prefecture: "北海道", lines: ["JR函館本線"] },
  asahikawa: { ja: "旭川駅", prefecture: "北海道", lines: ["JR函館本線", "JR宗谷本線"] },
  nakayama: { ja: "中山駅", prefecture: "北海道", lines: ["JR函館本線"] },

  // 宮城県
  sendai: { ja: "仙台駅", prefecture: "宮城県", lines: ["JR東北本線", "仙台市地下鉄南北線"] },

  // 広島県
  hiroshima: { ja: "広島駅", prefecture: "広島県", lines: ["JR山陽本線", "JR芸備線"] },
  mihara: { ja: "三原駅", prefecture: "広島県", lines: ["JR山陽本線", "JR呉線"] },
  kure: { ja: "呉駅", prefecture: "広島県", lines: ["JR呉線"] },

  // 京都府
  kyoto: { ja: "京都駅", prefecture: "京都府", lines: ["JR東海道本線", "JR奈良線", "近鉄京都線"] },
  tambaguchi: { ja: "丹波口駅", prefecture: "京都府", lines: ["JR山陰本線"] },
  fushimi: { ja: "伏見駅", prefecture: "京都府", lines: ["京阪本線", "近鉄京都線"] },
  imadegawa: { ja: "今出川駅", prefecture: "京都府", lines: ["京都市営地下鉄烏丸線"] },
  sanjo: { ja: "三条駅", prefecture: "京都府", lines: ["京都市営地下鉄東西線", "京阪本線"] },
  shijo: { ja: "四条駅", prefecture: "京都府", lines: ["京都市営地下鉄烏丸線"] },
  karasuma: { ja: "烏丸駅", prefecture: "京都府", lines: ["阪急京都線"] },
  karasumaoike: { ja: "烏丸御池駅", prefecture: "京都府", lines: ["京都市営地下鉄烏丸線", "京都市営地下鉄東西線"] },
  nijo: { ja: "二条駅", prefecture: "京都府", lines: ["JR山陰本線", "京都市営地下鉄東西線"] },
  fushimimomoyama: { ja: "伏見桃山駅", prefecture: "京都府", lines: ["京阪本線", "近鉄京都線"] },

  // 兵庫県
  itami: { ja: "伊丹駅", prefecture: "兵庫県", lines: ["JR福知山線", "阪急伊丹線"] },
  sannomiya: { ja: "三ノ宮駅", prefecture: "兵庫県", lines: ["JR東海道本線", "阪急神戸線", "阪神本線"] },

  // 和歌山県
  wakayama: { ja: "和歌山駅", prefecture: "和歌山県", lines: ["JR紀勢本線", "JR和歌山線"] },

  // 奈良県
  yamatoyagi: { ja: "大和八木駅", prefecture: "奈良県", lines: ["近鉄大阪線", "近鉄橿原線"] },

  // 新潟県
  nagaoka: { ja: "長岡駅", prefecture: "新潟県", lines: ["JR上越新幹線", "JR信越本線"] },

  // 三重県
  kintetsuyokaichi: { ja: "近鉄四日市駅", prefecture: "三重県", lines: ["近鉄名古屋線"] },

  // 福島県
  koriyama: { ja: "郡山駅", prefecture: "福島県", lines: ["JR東北本線", "JR磐越西線", "JR磐越東線"] },

  // 岩手県
  ichinoseki: { ja: "一ノ関駅", prefecture: "岩手県", lines: ["JR東北本線", "JR大船渡線"] },
  kamimorioka: { ja: "上盛岡駅", prefecture: "岩手県", lines: ["IGRいわて銀河鉄道"] },
  morioka: { ja: "盛岡駅", prefecture: "岩手県", lines: ["JR東北本線", "JR田沢湖線", "JR山田線"] },

  // 福島県
  iwaki: { ja: "いわき駅", prefecture: "福島県", lines: ["JR常磐線", "JR磐越東線"] },
  fukushima: { ja: "福島駅", prefecture: "福島県", lines: ["JR東北本線", "JR奥羽本線"] },

  // 茨城県
  tsukuba: { ja: "つくば駅", prefecture: "茨城県", lines: ["つくばエクスプレス"] },
  shimodate: { ja: "下館駅", prefecture: "茨城県", lines: ["JR水戸線", "真岡鐵道"] },

  // 埼玉県
  saitamashintoshin: { ja: "さいたま新都心駅", prefecture: "埼玉県", lines: ["JR京浜東北線", "JR埼京線"] },
  omiya: { ja: "大宮駅", prefecture: "埼玉県", lines: ["JR東北本線", "JR高崎線", "JR京浜東北線"] },
  kuki: { ja: "久喜駅", prefecture: "埼玉県", lines: ["JR東北本線", "東武伊勢崎線"] },
  ageo: { ja: "上尾駅", prefecture: "埼玉県", lines: ["JR高崎線"] },
  sengendai: { ja: "せんげん台駅", prefecture: "埼玉県", lines: ["東武伊勢崎線"] },
  fujimino: { ja: "ふじみ野駅", prefecture: "埼玉県", lines: ["東武東上線"] },
  tokorozawa: { ja: "所沢駅", prefecture: "埼玉県", lines: ["西武池袋線", "西武新宿線"] },
  kawagoe: { ja: "川越駅", prefecture: "埼玉県", lines: ["JR川越線", "東武東上線"] },
  utsunomiya: { ja: "宇都宮駅", prefecture: "栃木県", lines: ["JR東北本線", "JR日光線"] },

  // 千葉県
  ohanajaya: { ja: "お花茶屋駅", prefecture: "東京都", lines: ["京成本線"] },
  ichikawa: { ja: "市川駅", prefecture: "千葉県", lines: ["JR総武線"] },
  funabashi: { ja: "船橋駅", prefecture: "千葉県", lines: ["JR総武線", "東武野田線"] },
  kashiwa: { ja: "柏駅", prefecture: "千葉県", lines: ["JR常磐線", "東武野田線"] },

  // その他の県
  kurashiki: { ja: "倉敷駅", prefecture: "岡山県", lines: ["JR山陽本線", "JR伯備線"] },
  kurayoshi: { ja: "倉吉駅", prefecture: "鳥取県", lines: ["JR山陰本線"] },
  yonago: { ja: "米子駅", prefecture: "鳥取県", lines: ["JR山陰本線", "JR伯備線"] },
  nanao: { ja: "七尾駅", prefecture: "石川県", lines: ["JR七尾線"] },
  kanazawa: { ja: "金沢駅", prefecture: "石川県", lines: ["JR北陸本線", "JR七尾線"] },
  toyama: { ja: "富山駅", prefecture: "富山県", lines: ["JR北陸本線", "JR高山本線"] },
  takaoka: { ja: "高岡駅", prefecture: "富山県", lines: ["JR北陸本線", "JR城端線"] },
  nagano: { ja: "長野駅", prefecture: "長野県", lines: ["JR北陸新幹線", "しなの鉄道北しなの線"] },
  matsumoto: { ja: "松本駅", prefecture: "長野県", lines: ["JR篠ノ井線", "JR大糸線"] },
  ueda: { ja: "上田駅", prefecture: "長野県", lines: ["JR北陸新幹線", "しなの鉄道線"] },
  shizuoka: { ja: "静岡駅", prefecture: "静岡県", lines: ["JR東海道本線", "JR東海道新幹線"] },
  numazu: { ja: "沼津駅", prefecture: "静岡県", lines: ["JR東海道本線", "JR御殿場線"] },
  mishima: { ja: "三島駅", prefecture: "静岡県", lines: ["JR東海道新幹線", "JR東海道本線"] },
  mishimahirokoji: { ja: "三島広小路駅", prefecture: "静岡県", lines: ["伊豆箱根鉄道駿豆線"] },
  tsu: { ja: "津駅", prefecture: "三重県", lines: ["JR紀勢本線", "JR名松線", "近鉄名古屋線"] },
  hisai: { ja: "久居駅", prefecture: "三重県", lines: ["JR名松線", "近鉄名古屋線"] },
  ina: { ja: "伊那市駅", prefecture: "長野県", lines: ["JR飯田線"] },
  isesaki: { ja: "伊勢崎駅", prefecture: "群馬県", lines: ["JR両毛線", "東武伊勢崎線"] },
  takasaki: { ja: "高崎駅", prefecture: "群馬県", lines: ["JR高崎線", "JR上越線", "JR信越本線"] },
  maebashi: { ja: "前橋駅", prefecture: "群馬県", lines: ["JR両毛線"] },
  akita: { ja: "秋田駅", prefecture: "秋田県", lines: ["JR奥羽本線", "JR羽越本線"] },
  yamagata: { ja: "山形駅", prefecture: "山形県", lines: ["JR奥羽本線", "JR仙山線"] },
  sakata: { ja: "酒田駅", prefecture: "山形県", lines: ["JR羽越本線"] },
  fukui: { ja: "福井駅", prefecture: "福井県", lines: ["JR北陸本線", "えちぜん鉄道"] },
  matsue: { ja: "松江駅", prefecture: "島根県", lines: ["JR山陰本線"] },
  izumo: { ja: "出雲市駅", prefecture: "島根県", lines: ["JR山陰本線"] },
  okayama: { ja: "岡山駅", prefecture: "岡山県", lines: ["JR山陽本線", "JR山陽新幹線", "JR宇野線"] },
  matsuyama: { ja: "松山駅", prefecture: "愛媛県", lines: ["JR予讃線"] },
  imabari: { ja: "今治駅", prefecture: "愛媛県", lines: ["JR予讃線"] },
  yawatahama: { ja: "八幡浜駅", prefecture: "愛媛県", lines: ["JR予讃線"] },
  iyoozu: { ja: "伊予大洲駅", prefecture: "愛媛県", lines: ["JR予讃線"] },
  niihama: { ja: "新居浜駅", prefecture: "愛媛県", lines: ["JR予讃線"] },
  saijo: { ja: "西条駅", prefecture: "愛媛県", lines: ["JR予讃線"] },
  tokushima: { ja: "徳島駅", prefecture: "徳島県", lines: ["JR高徳線", "JR徳島線"] },
  kochi: { ja: "高知駅", prefecture: "高知県", lines: ["JR土讃線", "JR土佐線"] },
  marugame: { ja: "丸亀駅", prefecture: "香川県", lines: ["JR予讃線"] },
  takamatsu: { ja: "高松駅", prefecture: "香川県", lines: ["JR予讃線", "JR高徳線"] },
  oita: { ja: "大分駅", prefecture: "大分県", lines: ["JR日豊本線", "JR久大本線"] },
  saeki: { ja: "佐伯駅", prefecture: "大分県", lines: ["JR日豊本線"] },
  miyazaki: { ja: "宮崎駅", prefecture: "宮崎県", lines: ["JR日豊本線", "JR日南線"] },
  kagoshima: { ja: "鹿児島中央駅", prefecture: "鹿児島県", lines: ["JR鹿児島本線", "JR日豊本線"] },
  kumamoto: { ja: "熊本駅", prefecture: "熊本県", lines: ["JR鹿児島本線", "JR豊肥本線"] },
  amakusa: { ja: "天草駅", prefecture: "熊本県", lines: ["天草エアライン"] },
  nagasaki: { ja: "長崎駅", prefecture: "長崎県", lines: ["JR長崎本線"] },
  sasebochuo: { ja: "佐世保中央駅", prefecture: "長崎県", lines: ["松浦鉄道西九州線"] },
  nakasasebo: { ja: "中佐世保駅", prefecture: "長崎県", lines: ["松浦鉄道西九州線"] },
  naha: { ja: "那覇空港駅", prefecture: "沖縄県", lines: ["沖縄都市モノレール"] },
  okinawa: { ja: "沖縄市駅", prefecture: "沖縄県", lines: ["沖縄バス"] },
  okinawacity: { ja: "沖縄市", prefecture: "沖縄県", lines: [] },
  urasoe: { ja: "浦添駅", prefecture: "沖縄県", lines: [] },
  uruma: { ja: "うるま市", prefecture: "沖縄県", lines: [] },
  omoromachi: { ja: "おもろまち駅", prefecture: "沖縄県", lines: ["沖縄都市モノレール"] },
  aomori: { ja: "青森駅", prefecture: "青森県", lines: ["JR奥羽本線", "JR津軽線"] },
  hachinohe: { ja: "八戸駅", prefecture: "青森県", lines: ["JR東北新幹線", "JR八戸線"] },
  misawa: { ja: "三沢駅", prefecture: "青森県", lines: ["JR東北本線"] },

  // 静岡県 - 伊豆方面
  nirayama: { ja: "韮山駅", prefecture: "静岡県", lines: ["伊豆箱根鉄道駿豆線"] },
  takyo: { ja: "田京駅", prefecture: "静岡県", lines: ["伊豆箱根鉄道駿豆線"] },
  ohito: { ja: "大仁駅", prefecture: "静岡県", lines: ["伊豆箱根鉄道駿豆線"] },
  mishima: { ja: "三島駅", prefecture: "静岡県", lines: ["JR東海道本線", "JR東海道新幹線", "伊豆箱根鉄道駿豆線"] },
  numazu: { ja: "沼津駅", prefecture: "静岡県", lines: ["JR東海道本線", "JR御殿場線"] },
  atami: { ja: "熱海駅", prefecture: "静岡県", lines: ["JR東海道本線", "JR東海道新幹線", "伊東線"] },
  ito: { ja: "伊東駅", prefecture: "静岡県", lines: ["JR伊東線"] },
  gotemba: { ja: "御殿場駅", prefecture: "静岡県", lines: ["JR御殿場線"] },

  // 静岡県 - その他
  fuji: { ja: "富士駅", prefecture: "静岡県", lines: ["JR東海道本線", "JR身延線"] },
  mishimataguchi: { ja: "三島田町駅", prefecture: "静岡県", lines: ["伊豆箱根鉄道駿豆線"] },
  izukokawa: { ja: "伊豆国市駅", prefecture: "静岡県", lines: [] },
  izunagaoka: { ja: "伊豆長岡駅", prefecture: "静岡県", lines: ["伊豆箱根鉄道駿豆線"] },

  // 愛知県 - 追加
  okazaki: { ja: "岡崎駅", prefecture: "愛知県", lines: ["JR東海道本線", "愛知環状鉄道線"] },
  toyohashi: { ja: "豊橋駅", prefecture: "愛知県", lines: ["JR東海道本線", "JR飯田線", "名鉄名古屋本線"] },
  kasugai: { ja: "春日井駅", prefecture: "愛知県", lines: ["JR中央本線"] },
  ichinomiya: { ja: "一宮駅", prefecture: "愛知県", lines: ["JR東海道本線", "名鉄名古屋本線"] },
  toyota: { ja: "豊田市駅", prefecture: "愛知県", lines: ["名鉄三河線"] },

  // 茨城県 - 追加
  hitachi: { ja: "日立駅", prefecture: "茨城県", lines: ["JR常磐線"] },
  hitachinaka: { ja: "勝田駅", prefecture: "茨城県", lines: ["JR常磐線"] },
  toride: { ja: "取手駅", prefecture: "茨城県", lines: ["JR常磐線", "関東鉄道常総線"] },
  tsukuba: { ja: "つくば駅", prefecture: "茨城県", lines: ["つくばエクスプレス"] },

  // 群馬県 - 追加
  takasaki: { ja: "高崎駅", prefecture: "群馬県", lines: ["JR高崎線", "JR上越新幹線", "JR八高線"] },
  maebashi: { ja: "前橋駅", prefecture: "群馬県", lines: ["JR両毛線"] },
  kiryu: { ja: "桐生駅", prefecture: "群馬県", lines: ["JR両毛線"] },

  // 栃木県 - 追加
  oyama: { ja: "小山駅", prefecture: "栃木県", lines: ["JR東北本線", "JR水戸線", "JR両毛線"] },
  ashikaga: { ja: "足利駅", prefecture: "栃木県", lines: ["JR両毛線"] },
  sano: { ja: "佐野駅", prefecture: "栃木県", lines: ["JR両毛線"] },

  // 長野県 - 追加
  matsumoto: { ja: "松本駅", prefecture: "長野県", lines: ["JR篠ノ井線", "JR大糸線", "松本電鉄上高地線"] },
  suzaka: { ja: "須坂駅", prefecture: "長野県", lines: ["長野電鉄長野線"] },
  ueda: { ja: "上田駅", prefecture: "長野県", lines: ["JR北陸新幹線", "JR信越本線", "上田電鉄別所線"] },
  iida: { ja: "飯田駅", prefecture: "長野県", lines: ["JR飯田線"] },

  // 山梨県 - 追加
  kofu: { ja: "甲府駅", prefecture: "山梨県", lines: ["JR中央本線", "JR身延線"] },

  // 岐阜県 - 追加
  gifu: { ja: "岐阜駅", prefecture: "岐阜県", lines: ["JR東海道本線", "JR高山本線", "名鉄名古屋本線"] },
  ogaki: { ja: "大垣駅", prefecture: "岐阜県", lines: ["JR東海道本線", "JR大垣駅", "養老鉄道"] },

  // 山口県 - 追加
  yamaguchi: { ja: "山口駅", prefecture: "山口県", lines: ["JR山口線"] },
  shimonoseki: { ja: "下関駅", prefecture: "山口県", lines: ["JR山陽本線", "JR山陰本線"] },

  // 愛媛県 - 追加
  matsuyama: { ja: "松山駅", prefecture: "愛媛県", lines: ["JR予讃線"] },
  iyo: { ja: "伊予市駅", prefecture: "愛媛県", lines: ["JR予讃線"] },

  // 香川県 - 追加
  takamatsu: { ja: "高松駅", prefecture: "香川県", lines: ["JR予讃線", "JR高徳線"] },

  // 徳島県 - 追加
  tokushima: { ja: "徳島駅", prefecture: "徳島県", lines: ["JR高徳線", "JR徳島線"] },

  // 高知県 - 追加
  kochi: { ja: "高知駅", prefecture: "高知県", lines: ["JR土讃線"] },

  // 福井県 - 追加
  fukui: { ja: "福井駅", prefecture: "福井県", lines: ["JR北陸本線", "えちぜん鉄道"] },

  // 石川県 - 追加
  kanazawa: { ja: "金沢駅", prefecture: "石川県", lines: ["JR北陸本線", "JR北陸新幹線"] },

  // 富山県 - 追加
  toyama: { ja: "富山駅", prefecture: "富山県", lines: ["JR北陸本線", "JR高山本線", "富山地方鉄道"] },
}

export function getStationInfo(slug: string) {
  return stationMap[slug.toLowerCase()]
}

export function getStationJapaneseName(slug: string): string {
  const info = getStationInfo(slug)
  return info?.ja || slug
}

// Common hiragana to kanji conversions for station names
const hiraganaToKanji: Record<string, string> = {
  'さっぽろ': '札幌',
  'なかやま': '中山',
  'しもまつ': '下松',
}

// Normalize function to handle character variations
function normalizeStationName(name: string): string {
  let normalized = name.trim()

  // Check for hiragana station names
  for (const [hiragana, kanji] of Object.entries(hiraganaToKanji)) {
    if (normalized.includes(hiragana)) {
      normalized = normalized.replace(hiragana, kanji)
    }
  }

  return normalized
    .replace(/ヶ/g, 'ケ')  // Normalize ヶ to ケ
    .replace(/ケ/g, 'ケ')  // Ensure consistent ケ
    .replace(/ヵ/g, 'カ')  // Normalize ヵ to カ
    .replace(/〈/g, '(')   // Normalize special brackets
    .replace(/〉/g, ')')
}

// Create reverse map: Japanese name -> English slug
const reverseStationMap: Record<string, string> = {}
Object.entries(stationMap).forEach(([slug, info]) => {
  // Store both with and without 駅 suffix, with normalized names
  const nameWithStation = info.ja
  const nameWithoutStation = info.ja.replace(/駅$/, '')

  // Store original names
  reverseStationMap[nameWithStation] = slug
  reverseStationMap[nameWithoutStation] = slug

  // Store normalized names
  const normalizedWithStation = normalizeStationName(nameWithStation)
  const normalizedWithoutStation = normalizeStationName(nameWithoutStation)
  if (normalizedWithStation !== nameWithStation) {
    reverseStationMap[normalizedWithStation] = slug
  }
  if (normalizedWithoutStation !== nameWithoutStation) {
    reverseStationMap[normalizedWithoutStation] = slug
  }
})

export function getStationSlug(japaneseName: string): string | undefined {
  // Try exact match first
  const trimmed = japaneseName.trim()
  if (reverseStationMap[trimmed]) {
    return reverseStationMap[trimmed]
  }

  // Try normalized match
  const normalized = normalizeStationName(trimmed)
  if (reverseStationMap[normalized]) {
    return reverseStationMap[normalized]
  }

  // Try without 駅 suffix
  const withoutStation = trimmed.replace(/駅$/, '')
  if (reverseStationMap[withoutStation]) {
    return reverseStationMap[withoutStation]
  }

  // Try normalized without 駅 suffix
  const normalizedWithoutStation = normalizeStationName(withoutStation)
  if (reverseStationMap[normalizedWithoutStation]) {
    return reverseStationMap[normalizedWithoutStation]
  }

  return undefined
}
