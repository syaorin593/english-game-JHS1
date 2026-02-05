// --- 設定 & データ定義 ---
const SAVE_KEY = 'english_quest_ultimate_v9_fix_endless'; 
const OLD_KEYS = ['english_quest_ultimate_v8_fix', 'english_quest_ultimate_v7_safe'];

// --- 称号データ ---
const ACHIEVEMENTS = [
    {id:'c1', name:'旅立ち', desc:'Stage 1 クリア', icon:'🌱'},
    {id:'c2', name:'一歩前進', desc:'Stage 2 クリア', icon:'🚶'},
    {id:'c3', name:'否定の理解', desc:'Stage 3 クリア', icon:'🙅'},
    {id:'c4', name:'質問上手', desc:'Stage 4 クリア', icon:'❓'},
    {id:'c5', name:'可能性', desc:'Stage 5 クリア', icon:'💪'},
    {id:'c6', name:'探求者', desc:'Stage 6 クリア', icon:'🔍'},
    {id:'c7', name:'指示役', desc:'Stage 7 クリア', icon:'👉'},
    {id:'c8', name:'進行中', desc:'Stage 8 クリア', icon:'🏃'},
    {id:'c9', name:'未来志向', desc:'Stage 9 クリア', icon:'🌈'},
    {id:'c10', name:'歴史家', desc:'Stage 10 クリア', icon:'📜'},
    {id:'c11', name:'基礎マスター', desc:'Final Quest クリア', icon:'🎓'},
    {id:'c12', name:'真の英雄', desc:'EX Stage クリア', icon:'👑'},
    
    {id:'combo_10', name:'リズム', desc:'10コンボ達成', icon:'🎵'},
    {id:'combo_30', name:'フロー', desc:'30コンボ達成', icon:'🌊'},
    {id:'combo_50', name:'ゾーン', desc:'50コンボ達成', icon:'⚡'},
    {id:'rank_s', name:'完璧主義', desc:'ランクSを獲得', icon:'✨'},
    {id:'rank_f', name:'挫折を知る', desc:'ゲームオーバーになる', icon:'💀'},
    {id:'no_miss', name:'ノーミス', desc:'全問正解でクリア', icon:'🎯'},
    {id:'full_hp', name:'無傷の生還', desc:'HP満タンでクリア', icon:'🛡️'},
    {id:'survivor', name:'生存者', desc:'HP1でクリア', icon:'❤️‍🔥'},
    {id:'boss_killer', name:'ボス撃破', desc:'ボスに勝利する', icon:'👹'},

    {id:'rich', name:'大富豪', desc:'1000G 貯める', icon:'💰'},
    {id:'item_user', name:'道具使い', desc:'アイテムを使用する', icon:'💊'},

    {id:'total_50', name:'学習の芽', desc:'累計50問正解', icon:'🥉'},
    {id:'total_100', name:'知識の蕾', desc:'累計100問正解',icon:'🥈'},
    {id:'total_300', name:'大賢者', desc:'累計300問正解', icon:'🥇'},
    {id:'total_500', name:'伝説', desc:'累計500問正解', icon:'💎'},
    {id:'total_1000', name:'英語の神', desc:'累計1000問正解', icon:'🪐'},
    {id:'level_5', name:'ルーキー', desc:'Lv.5 到達', icon:'⭐'},
    {id:'level_10', name:'ベテラン', desc:'Lv.10 到達', icon:'🌟'},
    {id:'level_20', name:'マスター', desc:'Lv.20 到達', icon:'🌌'},
    {id:'end_10', name:'持久力', desc:'エンドレス10問到達', icon:'🔋'},
    {id:'end_30', name:'無限の彼方', desc:'エンドレス30問到達', icon:'🚀'},

    {id:'night_owl', name:'夜更かし', desc:'深夜(0-4時)にプレイ', icon:'🦉', hidden:true},
    {id:'lucky_7', name:'ラッキー7', desc:'スコアの末尾が77', icon:'🎰', hidden:true},
    {id:'creator', name:'創造主', desc:'デバッグモード起動', icon:'🛠️', hidden:true}
];

const STAGE_TITLES = {
    1:"be動詞", 2:"一般動詞", 3:"否定文", 4:"疑問文", 5:"can",
    6:"疑問詞", 7:"複数・命令", 8:"進行形", 9:"不定詞", 10:"過去形", 
    11:"Final", 12:"EX:鬼の全文記述"
};

// --- 問題データ生成 ---
function getStageData(stageId) {
    let q = [];
    const add = (type, qText, ans, opts, expl) => {
        q.push({ id: `${stageId}_${q.length}_${Date.now()}_${Math.random()}`, stage: stageId, type, q: qText, a: ans, o: opts, expl });
    };

    // --- Stage 1: be動詞 ---
    if (stageId === 1 || stageId >= 11) {
        add('choice', 'I ( ) a student.', 'am', ['am','is','are','be'], 'I am ~');
        add('choice', 'You ( ) very kind.', 'are', ['are','is','am','be'], 'You are ~');
        add('choice', 'He ( ) my brother.', 'is', ['is','am','are','does'], 'He is ~');
        add('choice', 'They ( ) busy now.', 'are', ['are','is','am','do'], 'They are ~');
        add('sort', '私はトムです。', 'I am Tom', ['I','am','Tom'], 'I am Tom.');
        add('sort', 'あなたは先生です。', 'You are a teacher', ['You','are','a','teacher'], 'You are a teacher.');
        add('sort', '彼は私たちの先生です。', 'He is our teacher', ['He','is','our','teacher'], 'He is ~.');
        add('fill', '私の母は医者です。 My mother ( ) a doctor.', 'is', null, 'My mother is ~.');
        add('fill', '彼らは公園にいます。 They ( ) in the park.', 'are', null, 'They are ~.');
        add('full', '私は学生です。', 'I am a student.', null, 'I am a student.');
        add('full', 'これは本です。', 'This is a book.', null, 'This is a book.');
    }

    // --- Stage 2: 一般動詞 ---
    if (stageId === 2 || stageId >= 11) {
        add('choice', 'I ( ) tennis.', 'play', ['play','plays','playing','played'], 'I play ~');
        add('choice', 'She ( ) soccer.', 'plays', ['plays','play','playing','played'], 'She plays ~');
        add('choice', 'He ( ) music.', 'likes', ['likes','like','liking','liked'], 'He likes ~');
        add('sort', '私は猫が好きです。', 'I like cats', ['I','like','cats'], 'I like cats.');
        add('sort', '彼は東京に住んでいます。', 'He lives in Tokyo', ['He','lives','in','Tokyo'], 'He lives ~.');
        add('fill', '私はあなたを知っています。 I ( ) you.', 'know', null, 'I know you.');
        add('full', '私はテニスをします。', 'I play tennis.', null, 'I play tennis.');
        add('full', '彼は夕食を作ります。', 'He cooks dinner.', null, 'He cooks dinner.');
    }

    // --- Stage 3: 否定文 ---
    if (stageId === 3 || stageId >= 11) {
        add('choice', 'I ( ) not hungry.', 'am', ['am','do','is','are'], 'be動詞(am)の否定');
        add('choice', 'He ( ) not a teacher.', 'is', ['is','does','are','am'], 'be動詞(is)の否定');
        add('choice', 'I ( ) like natto.', "don't", ["don't","doesn't","not","isn't"], '一般動詞(I)の否定');
        add('choice', 'She ( ) speak English.', "doesn't", ["doesn't","don't","isn't","not"], '一般動詞(She)の否定');
        add('sort', 'これはペンではありません。', 'This is not a pen', ['This','is','not','a','pen'], 'This is not ~.');
        add('sort', '私は泳ぎません。', 'I do not swim', ['I','do','not','swim'], 'I do not ~.');
        add('fill', '私たちは忙しくありません。 We ( ) not busy.', 'are', null, 'We are not ~.');
        add('fill', 'ケンはテニスをしません。 Ken ( ) not play tennis.', 'does', null, 'Ken does not ~.');
        add('full', '私はその本を持っていません。', "I don't have the book.", null, "I don't have ~.");
        add('full', '彼女は走りません。', "She doesn't run.", null, "She doesn't run.");
    }

    // --- Stage 4: 疑問文 ---
    if (stageId === 4 || stageId >= 11) {
        add('choice', '( ) you happy?', 'Are', ['Are','Do','Is','Does'], 'happy(形容詞) -> Are');
        add('choice', '( ) you play soccer?', 'Do', ['Do','Are','Is','Does'], 'play(動詞) -> Do');
        add('choice', '( ) he a student?', 'Is', ['Is','Does','Are','Do'], 'student(名詞) -> Is');
        add('choice', '( ) she like music?', 'Does', ['Does','Is','Do','Are'], 'like(動詞/3単) -> Does');
        add('sort', 'あなたは学生ですか？', 'Are you a student', ['Are','you','a','student'], 'Are you ~?');
        add('sort', 'あなたはコーヒーが好きですか？', 'Do you like coffee', ['Do','you','like','coffee'], 'Do you ~?');
        add('fill', 'これはあなたの本ですか？ ( ) this your book?', 'Is', null, 'Is this ~?');
        add('fill', '彼らはここに住んでいますか？ ( ) they live here?', 'Do', null, 'Do they ~?');
        add('full', 'あなたは元気ですか？', 'Are you fine?', null, 'Are you fine?');
        add('full', 'あなたはテニスをしますか？', 'Do you play tennis?', null, 'Do you play tennis?');
    }

    // --- Stage 5: can ---
    if (stageId === 5 || stageId >= 11) {
        add('choice', 'I ( ) swim.', 'can', ['can','cans','am','does'], 'can + 原形');
        add('choice', 'He ( ) run fast.', 'can', ['can','is','does','has'], '主語が変わってもcan');
        add('choice', 'Can you ( ) the guitar?', 'play', ['play','plays','playing','played'], 'canの後ろは原形');
        add('sort', '私はスキーができます。', 'I can ski', ['I','can','ski'], 'I can ~.');
        add('sort', 'ドアを開けてくれませんか？', 'Can you open the door', ['Can','you','open','the','door'], '依頼の Can you ~?');
        add('fill', '私たちは英語を話せます。 We ( ) speak English.', 'can', null, 'We can ~.');
        add('fill', '私は速く走れません。 I ( ) not run fast.', 'cannot', null, 'cannot (can\'t)');
        add('full', '私は泳げます。', 'I can swim.', null, 'I can swim.');
        add('full', 'いいですよ。', 'Yes, I can.', null, 'Yes, I can.');
    }

    // --- Stage 6: 疑問詞 ---
    if (stageId === 6 || stageId >= 11) {
        add('choice', '( ) is this?', 'What', ['What','Who','Where','When'], '何 -> What');
        add('choice', '( ) is that boy?', 'Who', ['Who','Which','Where','When'], '誰 -> Who');
        add('choice', '( ) do you live?', 'Where', ['Where','What','Who','When'], 'どこ -> Where');
        add('choice', '( ) is your birthday?', 'When', ['When','Where','Who','What'], 'いつ -> When');
        add('sort', 'あれは何ですか？', 'What is that', ['What','is','that'], 'What is ~?');
        add('sort', 'あなたは誰ですか？', 'Who are you', ['Who','are','you'], 'Who are ~?');
        add('fill', '何時ですか？ ( ) time is it?', 'What', null, 'What time');
        add('fill', 'どんなスポーツが好きですか？ ( ) sport do you like?', 'What', null, 'What sport');
        add('full', 'これは何ですか？', 'What is this?', null, 'What is this?');
        add('full', 'あなたはどこに住んでいますか？', 'Where do you live?', null, 'Where do you live?');
    }

    // --- Stage 7: 複数形・命令形 ---
    if (stageId === 7 || stageId >= 11) {
        add('choice', 'I have two ( ).', 'dogs', ['dogs','dog',"dog's",'doges'], '2匹 -> 複数形');
        add('choice', '( ) the door.', 'Open', ['Open','Opens','Opening','To open'], '命令形は原形');
        add('choice', "Let's ( ) soccer.", 'play', ['play','plays','playing','played'], "Let's + 原形");
        add('sort', 'この本を読みなさい。', 'Read this book', ['Read','this','book'], 'Read ~.');
        add('sort', '走ってはいけません。', 'Do not run', ['Do','not','run'], '禁止 Don\'t ~.');
        add('fill', '私は多くの本を持っています。 I have many ( ).', 'books', null, 'many books');
        add('fill', '注意しなさい。 Be ( ).', 'careful', null, 'Be careful.');
        add('full', 'ここで止まりなさい。', 'Stop here.', null, 'Stop here.');
        add('full', '英語を勉強しましょう。', "Let's study English.", null, "Let's study English.");
    }

    // --- Stage 8: 進行形 ---
    if (stageId === 8 || stageId >= 11) {
        add('choice', 'I am ( ) English.', 'studying', ['studying','study','studies','studied'], 'am + ing');
        add('choice', 'He is ( ) lunch.', 'eating', ['eating','eat','ate','eats'], 'is + ing');
        add('choice', 'They are ( ) now.', 'running', ['running','run','runs','runing'], 'running (n重ねる)');
        add('sort', '彼女は本を読んでいます。', 'She is reading a book', ['She','is','reading','a','book'], 'She is reading');
        add('sort', 'あなたは今何をしていますか？', 'What are you doing now', ['What','are','you','doing','now'], 'What are you doing');
        add('fill', '私は音楽を聴いています。 I am ( ) to music.', 'listening', null, 'listening');
        add('fill', 'ケンは泳いでいます。 Ken is ( ).', 'swimming', null, 'swimming');
        add('full', '彼は寝ています。', 'He is sleeping.', null, 'He is sleeping.');
        add('full', '私たちは歌っています。', 'We are singing.', null, 'We are singing.');
    }

    // --- Stage 9: 不定詞 ---
    if (stageId === 9 || stageId >= 11) {
        add('choice', 'I want ( ) a teacher.', 'to be', ['to be','be','being','been'], 'want to be');
        add('choice', 'I like ( ) tennis.', 'to play', ['to play','play','played','plays'], 'like to play');
        add('choice', 'I go to the park ( ) soccer.', 'to play', ['to play','play','for play','playing'], 'to play (〜するために)');
        add('sort', '私はアメリカに行きたいです。', 'I want to go to America', ['I','want','to','go','to','America'], 'want to go');
        add('sort', '私の夢は歌手になることです。', 'My dream is to be a singer', ['My','dream','is','to','be','a','singer'], 'to be ~');
        add('fill', '私は本を読むのが好きです。 I like ( ) read books.', 'to', null, 'like to read');
        add('fill', '彼に会えてうれしいです。 I am happy ( ) see him.', 'to', null, 'to see');
        add('full', '私は医者になりたいです。', 'I want to be a doctor.', null, 'I want to be a doctor.');
        add('full', '彼女はテニスをするのが好きです。', 'She likes to play tennis.', null, 'She likes to play tennis.');
    }

    // --- Stage 10: 過去形 ---
    if (stageId === 10 || stageId >= 11) {
        add('choice', 'I ( ) tennis yesterday.', 'played', ['played','play','plays','playing'], 'yesterday -> played');
        add('choice', 'He ( ) to the park.', 'went', ['went','go','goes','going'], 'go -> went');
        add('choice', 'I ( ) busy last night.', 'was', ['was','is','am','were'], 'last night -> was');
        add('sort', '私は新しい車を買いました。', 'I bought a new car', ['I','bought','a','new','car'], 'buy -> bought');
        add('sort', '彼は昨日ここに来ました。', 'He came here yesterday', ['He','came','here','yesterday'], 'come -> came');
        add('fill', '私は彼を見ました。 I ( ) him.', 'saw', null, 'see -> saw');
        add('fill', '私は昨日勉強しませんでした。 I ( ) not study yesterday.', 'did', null, 'did not');
        add('full', '彼は6時に起きました。', 'He got up at six.', null, 'get -> got');
        add('full', 'あなたはどこへ行きましたか？', 'Where did you go?', null, 'Where did you go?');
    }

    // --- Stage 12: EX (超難問) ---
    if (stageId === 12) {
        add('full', '私は日曜日にはサッカーをしません。', 'I do not play soccer on Sundays.', null, '習慣(Sundayにs)、do not');
        add('full', '私の父は毎日新しい車を洗います。', 'My father washes his new car every day.', null, 'wash -> washes, his car');
        add('full', 'あなたは放課後、図書館で勉強しますか？', 'Do you study at the library after school?', null, '場所 + 時');
        add('full', '彼女はとても上手にピアノを弾くことができます。', 'She can play the piano very well.', null, 'can play, very well');
        add('full', '公園で走っているあの少年は誰ですか？', 'Who is that boy running in the park?', null, 'Who is ~, running in the park');
        add('full', '机の上に本が何冊ありますか？', 'How many books are there on the desk?', null, 'How many ~ are there');
        add('full', '私は朝食を食べずに学校へ行きました。', 'I went to school without breakfast.', null, 'without ~ (〜なしで)');
        add('full', '昨夜、あなたはどこにいましたか？', 'Where were you last night?', null, 'Where were you');
        add('full', 'ケンはその時、自分の部屋で本を読んでいました。', 'Ken was reading a book in his room then.', null, 'was reading');
        add('full', '私にあなたの写真を見せてください。', 'Please show me your picture.', null, 'show me ~');
        add('full', 'オーストラリアでは何語が話されていますか？', 'What language is spoken in Australia?', null, 'is spoken (受動態)');
        add('full', '私はその映画を見たことがありません。', 'I have never seen the movie.', null, 'have never seen (現在完了)');
        add('full', 'どちらがあなたのペンですか、これですか、それともあれですか？', 'Which is your pen, this or that?', null, 'Which is ~, A or B?');
        add('full', '彼女は医者になりたがっています。', 'She wants to be a doctor.', null, 'wants to be');
        add('full', '彼らはそのニュースを知りませんでした。', "They didn't know the news.", null, "didn't know");
        return q;
    }

    return q;
}

// --- ゲーム変数 ---
let gameState = {
    mode: '', 
    stageId: 1,
    queue: [],
    qIndex: 0,
    score: 0,
    combo: 0,
    mistakes: [],
    hp: 3,
    maxHp: 3,
    expGained: 0,
    goldGained: 0,
    endlessWave: 0,
    writeCorrectCount: 0,
    shieldActive: false,
    pencilUsed: false,
    coinActive: false, 
    debugClicks: 0
};

// --- セーブデータ管理 ---
function loadGameData() {
    let data = localStorage.getItem(SAVE_KEY);
    if (!data) {
        // 過去のデータがあれば移行
        for (let oldKey of OLD_KEYS) {
            let oldData = localStorage.getItem(oldKey);
            if (oldData) {
                try {
                    let oldParsed = JSON.parse(oldData);
                    let newData = {
                        cleared: oldParsed.cleared || [],
                        achieved: oldParsed.achieved || [],
                        level: oldParsed.level || 1,
                        exp: oldParsed.exp || 0,
                        gold: oldParsed.gold || 0,
                        items: oldParsed.items || { potion: 0, bomb: 0, hint: 0, pencil: 0, shield: 0, coin: 0 },
                        totalSolved: oldParsed.totalSolved || 0,
                        writeCount: oldParsed.writeCount || 0
                    };
                    data = JSON.stringify(newData);
                    localStorage.setItem(SAVE_KEY, data);
                } catch(e) { console.error(e); }
                break;
            }
        }
    }
    
    let parsed = data ? JSON.parse(data) : {};
    
    return {
        cleared: parsed.cleared || [],
        achieved: parsed.achieved || [],
        level: parsed.level || 1,
        exp: parsed.exp || 0,
        gold: parsed.gold || 0,
        items: {
            potion: (parsed.items && parsed.items.potion) || 0,
            bomb: (parsed.items && parsed.items.bomb) || 0,
            hint: (parsed.items && parsed.items.hint) || 0,
            pencil: (parsed.items && parsed.items.pencil) || 0,
            shield: (parsed.items && parsed.items.shield) || 0,
            coin: (parsed.items && parsed.items.coin) || 0
        },
        totalSolved: parsed.totalSolved || 0,
        writeCount: parsed.writeCount || 0
    };
}
let saveData = loadGameData();

function getNextLevelExp(level) { return level * 50; } 

window.onload = () => {
    updateTitleStats();
    updateStageList();
    document.getElementById('game-title').onclick = () => {
        if(++gameState.debugClicks >= 7) {
            document.getElementById('debug-btn').classList.remove('hidden');
            unlockAchievement('creator');
        }
    };
    gameState.debugClicks = 0;
};

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(id === 'screen-stages') {
        const goldEl = document.getElementById('stage-gold');
        if(goldEl) goldEl.innerText = saveData.gold;
    }
}

function updateTitleStats() {
    const nextExp = getNextLevelExp(saveData.level);
    document.getElementById('title-level').innerText = saveData.level;
    document.getElementById('title-next-exp').innerText = nextExp - saveData.exp;
    const pct = Math.min(100, (saveData.exp / nextExp) * 100);
    document.getElementById('title-exp-bar').style.width = `${pct}%`;
}

function updateStageList() {
    const list = document.getElementById('stage-list');
    list.innerHTML = '';
    const maxStage = saveData.cleared.length >= 11 ? 12 : 11;

    for(let i=1; i<=maxStage; i++) {
        const btn = document.createElement('button');
        const isLocked = i > 1 && !saveData.cleared.includes(i-1);
        btn.innerText = `Stage ${i}: ${STAGE_TITLES[i]}`;
        if(saveData.cleared.includes(i)) btn.innerText += " ✅";
        
        if(isLocked) {
            btn.classList.add('locked');
            btn.disabled = true;
            btn.innerText = "🔒 Locked";
        } else {
            btn.onclick = () => startStage(i);
        }
        list.appendChild(btn);
    }
    
    // --- エンドレスモード解放処理 (Stage 11 クリアで解放) ---
    const endBtn = document.getElementById('btn-endless');
    if(saveData.cleared.includes(11)) { 
        endBtn.classList.remove('locked');
        endBtn.classList.remove('hidden'); // 解放されたら表示
        endBtn.innerText = "♾️ エンドレスモード";
        endBtn.disabled = false;
    } else {
        endBtn.classList.add('locked');
        endBtn.classList.add('hidden'); // まだなら隠す
        endBtn.disabled = true;
    }
    
    const goldEl = document.getElementById('stage-gold');
    if(goldEl) goldEl.innerText = saveData.gold;
}

// --- ショップ機能 ---
function showShop() {
    showScreen('screen-shop');
    updateShopUI();
}

function updateShopUI() {
    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };
    
    setTxt('shop-gold', `${saveData.gold} G`);
    setTxt('inv-potion', saveData.items.potion);
    setTxt('inv-bomb', saveData.items.bomb);
    setTxt('inv-hint', saveData.items.hint);
    setTxt('inv-pencil', saveData.items.pencil);
    setTxt('inv-shield', saveData.items.shield);
    setTxt('inv-coin', saveData.items.coin);
}

function buyItem(item, price) {
    if(saveData.gold >= price) {
        saveData.gold -= price;
        saveData.items[item] = (saveData.items[item] || 0) + 1;
        saveGame();
        updateShopUI();
    } else {
        alert("ゴールドが足りません！");
    }
}

// --- アイテム使用 ---
function updateItemButtons() {
    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if(el) el.innerText = val;
    };
    
    setTxt('game-inv-potion', saveData.items.potion || 0);
    setTxt('game-inv-bomb', saveData.items.bomb || 0);
    setTxt('game-inv-hint', saveData.items.hint || 0);
    setTxt('game-inv-pencil', saveData.items.pencil || 0);
    setTxt('game-inv-shield', saveData.items.shield || 0);
    setTxt('game-inv-coin', saveData.items.coin || 0);
    
    const currentQ = gameState.queue[gameState.qIndex];
    if(!currentQ) return;

    const btnPotion = document.getElementById('btn-use-potion');
    if(btnPotion) btnPotion.disabled = !(saveData.items.potion > 0 && gameState.hp < gameState.maxHp);

    const btnBomb = document.getElementById('btn-use-bomb');
    if(btnBomb) btnBomb.disabled = !(saveData.items.bomb > 0 && currentQ.type === 'choice');
    
    const btnHint = document.getElementById('btn-use-hint');
    if(btnHint) btnHint.disabled = !(saveData.items.hint > 0 && (currentQ.type === 'fill' || currentQ.type === 'full' || currentQ.type === 'sort'));
    
    const btnPencil = document.getElementById('btn-use-pencil');
    if(btnPencil) btnPencil.disabled = !(saveData.items.pencil > 0 && !gameState.pencilUsed && (currentQ.type === 'fill' || currentQ.type === 'full'));
    
    const btnShield = document.getElementById('btn-use-shield');
    if(btnShield) btnShield.disabled = !(saveData.items.shield > 0 && !gameState.shieldActive);
    
    const btnCoin = document.getElementById('btn-use-coin');
    if(btnCoin) btnCoin.disabled = !(saveData.items.coin > 0 && !gameState.coinActive);
}

function usePotion() {
    if(saveData.items.potion > 0 && gameState.hp < gameState.maxHp) {
        saveData.items.potion--;
        gameState.hp++;
        updateHpBar();
        updateItemButtons();
        unlockAchievement('item_user');
        saveGame();
    }
}

function useBomb() {
    if(saveData.items.bomb > 0) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'choice') {
            saveData.items.bomb--;
            saveGame();
            const container = document.getElementById('choices-container');
            const buttons = Array.from(container.children);
            let removed = 0;
            for(let btn of buttons) {
                if(btn.innerText !== q.a) {
                    btn.style.visibility = 'hidden';
                    removed++;
                    if(removed >= 2) break;
                }
            }
            updateItemButtons();
        }
    }
}

function useHint() {
    if(saveData.items.hint > 0) {
        saveData.items.hint--;
        saveGame();
        unlockAchievement('item_user');
        
        const q = gameState.queue[gameState.qIndex];
        
        if(q.type === 'sort') {
            alert(`最初の単語は "${q.a.split(' ')[0]}" です`);
        } else if(q.type === 'fill' || q.type === 'full') {
            const words = q.a.split(' ');
            const firstWord = words[0];
            const inp = document.getElementById('writing-input');
            inp.value = firstWord + " ";
            inp.focus();
            
            let hintPattern = words.map(w => w[0] + "_".repeat(Math.max(0, w.length-1))).join(' ');
            hintPattern = hintPattern.replace(/_/g, '_');
            document.getElementById('writing-hint').innerText = "Hint: " + hintPattern;
        }
        updateItemButtons();
    }
}

function usePencil() {
    if(saveData.items.pencil > 0 && !gameState.pencilUsed) {
        const q = gameState.queue[gameState.qIndex];
        if(q.type === 'fill' || q.type === 'full') {
            saveData.items.pencil--;
            gameState.pencilUsed = true;
            saveGame();
            
            let dummies = ["I don't know.", "She is happy.", "He plays tennis."];
            if(gameState.queue.length > 3) {
                dummies = gameState.queue.filter(bq => bq !== q).slice(0,3).map(bq => bq.a);
            }
            
            document.getElementById('writing-container').classList.add('hidden');
            const c = document.getElementById('choices-container');
            c.classList.remove('hidden');
            c.innerHTML = '';
            
            let opts = [q.a, ...dummies].sort(() => Math.random() - 0.5);
            opts.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = opt;
                btn.onclick = () => checkAnswer(opt === q.a, q);
                c.appendChild(btn);
            });
            updateItemButtons();
        }
    }
}

function useShield() {
    if(saveData.items.shield > 0 && !gameState.shieldActive) {
        saveData.items.shield--;
        gameState.shieldActive = true;
        document.getElementById('shield-overlay').classList.remove('hidden');
        saveGame();
        updateItemButtons();
    }
}

function useCoin() {
    if(saveData.items.coin > 0 && !gameState.coinActive) {
        saveData.items.coin--;
        gameState.coinActive = true;
        document.getElementById('coin-overlay').classList.remove('hidden');
        saveGame();
        updateItemButtons();
    }
}

function initGame(mode) {
    gameState.mode = mode;
    gameState.score = 0;
    gameState.combo = 0;
    gameState.qIndex = 0;
    gameState.mistakes = [];
    gameState.hp = 3;
    gameState.expGained = 0;
    gameState.goldGained = 0;
    gameState.endlessWave = 1;
    gameState.writeCorrectCount = 0;
    gameState.shieldActive = false;
    gameState.pencilUsed = false;
    gameState.coinActive = false;
    updateHpBar();
    showScreen('screen-game');
    updateItemButtons();
    document.getElementById('screen-game').classList.remove('boss-mode');
    document.getElementById('boss-overlay').classList.add('hidden');
    document.getElementById('shield-overlay').classList.add('hidden');
    document.getElementById('coin-overlay').classList.add('hidden');
}

function startStage(id) {
    initGame('stage');
    gameState.stageId = id;
    
    let pool = [];
    if(id === 12) {
        pool = getStageData(12);
        gameState.queue = pool.sort(() => Math.random() - 0.5).slice(0, 10);
    } else {
        let pool = (id === 11) ? [] : getStageData(id);
        if(id === 11) for(let i=1; i<=10; i++) pool = pool.concat(getStageData(i));

        const choices = pool.filter(q => q.type === 'choice');
        const sorts = pool.filter(q => q.type === 'sort');
        const writes = pool.filter(q => q.type === 'fill' || q.type === 'full');
        const pick = (arr, n) => arr.sort(() => Math.random() - 0.5).slice(0, n);
        
        let set = [];
        set = set.concat(pick(choices, 4));
        set = set.concat(pick(sorts, 3));
        set = set.concat(pick(writes, 3));
        
        while(set.length < 10 && pool.length >= 10) {
            let c = pool[Math.floor(Math.random()*pool.length)];
            if(!set.some(s=>s.id===c.id)) set.push(c);
        }
        gameState.queue = set.sort(() => Math.random() - 0.5);
    }
    
    if(gameState.queue.length === 0) { alert("Data Error"); return; }
    document.getElementById('q-category').innerText = `Stage ${id}`;
    showQuestion();
}

function startEndless() {
    initGame('endless');
    addEndlessQuestions();
    document.getElementById('q-category').innerText = "Endless Wave 1";
    showQuestion();
}

function addEndlessQuestions() {
    // Stage 1〜11 からランダム（EX除く）
    let pool = [];
    for(let i=1; i<=11; i++) pool = pool.concat(getStageData(i));
    gameState.queue = gameState.queue.concat(pool.sort(() => Math.random() - 0.5).slice(0, 10));
}

// --- 問題表示 ---
function showQuestion() {
    // 修正: エンドレスモードの次ウェーブ判定ロジック
    // 問題プールを使い果たした場合にモーダルを表示
    if (gameState.mode === 'endless' && gameState.qIndex >= gameState.queue.length) {
        showEndlessModal();
        return;
    }
    // ステージクリア判定
    if (gameState.qIndex >= gameState.queue.length) {
        finishGame(true);
        return;
    }

    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === 9);
    const gameScreen = document.getElementById('screen-game');
    const bossOverlay = document.getElementById('boss-overlay');
    
    if(isBoss) {
        gameScreen.classList.add('boss-mode');
        bossOverlay.classList.remove('hidden');
        setTimeout(() => bossOverlay.classList.add('hidden'), 2000);
    } else {
        gameScreen.classList.remove('boss-mode');
        bossOverlay.classList.add('hidden');
    }

    const q = gameState.queue[gameState.qIndex];
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('q-type-badge').innerText = getTypeLabel(q.type);

    const total = gameState.mode === 'stage' ? 10 : gameState.queue.length;
    const pct = ((gameState.qIndex) / total) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    ['choices-container', 'sort-container', 'writing-container'].forEach(id => 
        document.getElementById(id).classList.add('hidden')
    );
    document.getElementById('writing-status').classList.add('hidden');
    document.getElementById('writing-hint').innerText = ""; 
    updateItemButtons();

    if(q.type === 'choice') {
        const c = document.getElementById('choices-container');
        c.classList.remove('hidden');
        c.innerHTML = '';
        let opts = [...q.o].sort(() => Math.random() - 0.5);
        opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = opt;
            btn.onclick = () => checkAnswer(opt === q.a, q);
            c.appendChild(btn);
        });
    } else if(q.type === 'sort') {
        const c = document.getElementById('sort-container');
        c.classList.remove('hidden');
        gameState.sortAns = [];
        gameState.shuffledSortOptions = [...q.o].sort(() => Math.random() - 0.5);
        renderSortUI(q);
    } else {
        const c = document.getElementById('writing-container');
        c.classList.remove('hidden');
        const ws = document.getElementById('writing-status');
        const wordCount = q.a.trim().split(/\s+/).length;
        ws.innerText = `単語数: ${wordCount}`;
        ws.classList.remove('hidden');
        const inp = document.getElementById('writing-input');
        inp.value = '';
        inp.focus();
        inp.onkeydown = (e) => { if(e.key==='Enter') checkWritingAnswer(); };
    }
}

function getTypeLabel(t) {
    if(t==='choice') return '4択';
    if(t==='sort') return '並び替え';
    return '記述';
}

function normalizeText(text) {
    let t = text.toLowerCase().trim();
    t = t.replace(/[.?!,]/g, '');
    t = t.replace(/\s+/g, ' ');
    const maps = {
        "don't": "do not", "doesn't": "does not", "didn't": "did not",
        "can't": "cannot", "isn't": "is not", "aren't": "are not",
        "wasn't": "was not", "weren't": "were not",
        "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is",
        "we're": "we are", "they're": "they are", "it's": "it is"
    };
    for (let key in maps) {
        t = t.replace(new RegExp(key, 'g'), maps[key]);
    }
    return t;
}

function checkAnswer(isCorrect, q) {
    const area = document.getElementById('question-area');
    const isBoss = (gameState.mode === 'stage' && gameState.qIndex === 9);

    if(isCorrect) {
        gameState.score += 10 + gameState.combo;
        gameState.combo++;
        gameState.expGained += 20;
        let gold = 20; 
        if(isBoss) { gold += 50; gameState.expGained += 50; unlockAchievement('boss_killer'); }
        if(gameState.coinActive) gold *= 2; 
        gameState.goldGained += gold;

        if(q.type === 'full' || q.type === 'fill') gameState.writeCorrectCount++;
        area.classList.add('anim-correct');
        document.getElementById('score-display').innerText = `Score: ${gameState.score}`;
        checkInGameAchievements();
        setTimeout(() => {
            area.classList.remove('anim-correct');
            gameState.qIndex++;
            showQuestion();
        }, 500);
    } else {
        if(gameState.shieldActive) {
            gameState.shieldActive = false;
            document.getElementById('shield-overlay').classList.add('hidden');
            alert("🛡️ Shield blocked the damage!");
            gameState.combo = 0;
            area.classList.add('anim-wrong');
            setTimeout(() => {
                area.classList.remove('anim-wrong');
                showExplanation(q);
            }, 500);
        } else {
            let dmg = isBoss ? 2 : 1;
            gameState.hp -= dmg;
            updateHpBar();
            gameState.combo = 0;
            gameState.mistakes.push(q);
            area.classList.add('anim-wrong');
            
            if(gameState.hp <= 0) {
                setTimeout(() => finishGame(false), 500);
            } else {
                setTimeout(() => {
                    area.classList.remove('anim-wrong');
                    showExplanation(q);
                }, 500);
            }
        }
    }
}

function renderSortUI(q) {
    const area = document.getElementById('sort-answer-area');
    const opts = document.getElementById('sort-options-area');
    area.innerHTML = ''; opts.innerHTML = '';
    gameState.sortAns.forEach(w => {
        const sp = document.createElement('span');
        sp.className = 'sort-word';
        sp.innerText = w;
        area.appendChild(sp);
    });
    let remaining = [...q.o];
    gameState.sortAns.forEach(w => {
        const idx = remaining.indexOf(w);
        if(idx > -1) remaining.splice(idx, 1);
    });
    gameState.shuffledSortOptions.forEach(w => {
        if(remaining.includes(w)) {
            const btn = document.createElement('button');
            btn.className = 'btn-small';
            btn.innerText = w;
            btn.onclick = () => {
                gameState.sortAns.push(w);
                renderSortUI(q);
                if(gameState.sortAns.length === q.o.length) checkAnswer(gameState.sortAns.join(' ') === q.a, q);
            };
            opts.appendChild(btn);
            const idx = remaining.indexOf(w);
            if(idx > -1) remaining.splice(idx, 1);
        }
    });
}
function resetSort() { 
    gameState.sortAns = []; 
    gameState.shuffledSortOptions = [...gameState.queue[gameState.qIndex].o].sort(() => Math.random() - 0.5);
    renderSortUI(gameState.queue[gameState.qIndex]); 
}
function checkWritingAnswer() {
    const val = document.getElementById('writing-input').value.trim();
    const q = gameState.queue[gameState.qIndex];
    const normUser = normalizeText(val);
    const normAns = normalizeText(q.a);
    checkAnswer(normUser === normAns, q);
}
function updateHpBar() {
    const pct = Math.max(0, (gameState.hp / gameState.maxHp) * 100);
    const bar = document.getElementById('hp-bar-fill');
    bar.style.width = `${pct}%`;
    bar.style.backgroundColor = gameState.hp <= 1 ? '#d63031' : '#00b894';
}
function showExplanation(q) {
    const m = document.getElementById('explanation-modal');
    document.getElementById('expl-answer').innerText = q.a;
    document.getElementById('expl-text').innerText = q.expl || "No explanation.";
    m.classList.remove('hidden');
}
function closeExplanation() {
    document.getElementById('explanation-modal').classList.add('hidden');
    gameState.qIndex++;
    showQuestion();
}
function showEndlessModal() { document.getElementById('endless-modal').classList.remove('hidden'); }
// 修正: 帰還時にモーダルを閉じて終了する
function continueEndless() {
    document.getElementById('endless-modal').classList.add('hidden');
    gameState.endlessWave++;
    if(gameState.hp < gameState.maxHp) { gameState.hp++; updateHpBar(); }
    addEndlessQuestions();
    document.getElementById('q-category').innerText = `Endless Wave ${gameState.endlessWave}`;
    showQuestion();
}

function finishGame(isClear) {
    // 修正: エンドレスのモーダルを確実に閉じる
    document.getElementById('endless-modal').classList.add('hidden');
    
    showScreen('screen-result');
    const title = document.getElementById('result-title');
    const badge = document.getElementById('rank-badge');
    const msg = document.getElementById('levelup-msg');
    msg.classList.add('hidden');

    if(!isClear) {
        title.innerText = "GAME OVER";
        title.style.color = "#d63031";
        badge.innerText = "F";
        badge.className = "rank-F";
        unlockAchievement('rank_f');
    } else {
        title.innerText = "QUEST CLEAR!";
        title.style.color = "#2d3436";
        const rate = (10 - gameState.mistakes.length) / 10;
        let rank = 'C';
        if(rate >= 1.0) rank = 'S';
        else if(rate >= 0.8) rank = 'A';
        else if(rate >= 0.6) rank = 'B';
        badge.innerText = rank;
        badge.className = `rank-${rank}`;
        
        saveData.totalSolved += (gameState.qIndex - gameState.mistakes.length);
        saveData.writeCount += gameState.writeCorrectCount;

        if(gameState.mode === 'stage' && rank !== 'C') {
            if(!saveData.cleared.includes(gameState.stageId)) {
                saveData.cleared.push(gameState.stageId);
                unlockAchievement(`c${gameState.stageId}`);
                gameState.goldGained += 500; 
            }
        }
        
        if(rank === 'S') { unlockAchievement('rank_s'); gameState.goldGained += 300; }
        if(gameState.mistakes.length === 0) unlockAchievement('no_miss');
        if(gameState.hp === gameState.maxHp) unlockAchievement('full_hp');
        if(gameState.hp === 1) unlockAchievement('survivor');
    }

    saveData.gold += gameState.goldGained;
    document.getElementById('result-gold').innerText = `+${gameState.goldGained} G`;
    if(saveData.gold >= 1000) unlockAchievement('rich');

    processExp();
    checkGlobalAchievements();
    saveGame();
    updateStageList();
    updateTitleStats();
}

function checkInGameAchievements() {
    if(gameState.combo >= 10) unlockAchievement('combo_10');
    if(gameState.combo >= 30) unlockAchievement('combo_30');
    if(gameState.combo >= 50) unlockAchievement('combo_50');
    if(gameState.mode === 'endless') {
        const count = gameState.qIndex + 1;
        if(count >= 10) unlockAchievement('end_10');
        if(count >= 30) unlockAchievement('end_30');
    }
}
function checkGlobalAchievements() {
    if(saveData.totalSolved >= 50) unlockAchievement('total_50');
    if(saveData.totalSolved >= 100) unlockAchievement('total_100');
    if(saveData.totalSolved >= 300) unlockAchievement('total_300');
    if(saveData.totalSolved >= 500) unlockAchievement('total_500');
    if(saveData.totalSolved >= 1000) unlockAchievement('total_1000');
    if(saveData.level >= 5) unlockAchievement('level_5');
    if(saveData.level >= 10) unlockAchievement('level_10');
    if(saveData.level >= 20) unlockAchievement('level_20');
    if(saveData.writeCount >= 10) unlockAchievement('writer');
    const h = new Date().getHours();
    if(h >= 0 && h <= 4) unlockAchievement('night_owl');
}
function unlockAchievement(id) {
    if(!saveData.achieved.includes(id)) {
        saveData.achieved.push(id);
        const a = ACHIEVEMENTS.find(x => x.id === id);
        if(a) { const name = (a.hidden) ? a.name : a.name; alert(`🏆 称号獲得: ${name}\n${a.desc}`); }
        saveGame();
    }
}
function processExp() {
    const gained = gameState.expGained;
    saveData.exp += gained;
    document.getElementById('result-exp').innerText = `+${gained} EXP`;
    let leveledUp = false;
    while(true) {
        const need = getNextLevelExp(saveData.level);
        if(saveData.exp >= need) {
            saveData.exp -= need;
            saveData.level++;
            leveledUp = true;
        } else { break; }
    }
    const nextNeed = getNextLevelExp(saveData.level);
    const pct = (saveData.exp / nextNeed) * 100;
    document.getElementById('result-exp-bar').style.width = `${pct}%`;
    if(leveledUp) document.getElementById('levelup-msg').classList.remove('hidden');
}
function saveGame() { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData)); }
function showAchievements() {
    showScreen('screen-achievements');
    const list = document.getElementById('achievement-list');
    list.innerHTML = '';
    const stats = document.getElementById('achievement-stats');
    const unlocked = saveData.achieved.length;
    stats.innerText = `獲得数: ${unlocked} / ${ACHIEVEMENTS.length}`;
    ACHIEVEMENTS.forEach(a => {
        const u = saveData.achieved.includes(a.id);
        const div = document.createElement('div');
        div.className = `achievement-card ${u?'unlocked':''}`;
        const name = a.name;
        const desc = (a.hidden && !u) ? "???" : a.desc;
        div.innerHTML = `<div class="achieve-icon">${u?a.icon:'🔒'}</div><div><div style="font-weight:bold">${name}</div><div style="font-size:0.8rem; color:#636e72">${desc}</div></div>`;
        list.appendChild(div);
    });
}
function confirmQuit() { if(confirm("あきらめますか？")) showScreen('screen-title'); }
function retryGame() { if(gameState.mode==='stage') startStage(gameState.stageId); else startEndless(); }
function nextStage() { startStage(gameState.stageId + 1); }
function toggleDebugMenu() { document.getElementById('debug-menu').classList.toggle('hidden'); }
function debugUnlockAll() { 
    saveData.cleared=[1,2,3,4,5,6,7,8,9,10,11,12]; 
    saveData.level = 20; saveData.gold+=10000;
    saveGame(); updateStageList(); updateTitleStats(); 
    alert("全開放しました！"); 
}
function debugReset() { 
    if(confirm("【重要】全てのデータを消去して初期化しますか？")) { 
        localStorage.clear();
        saveData = {
            cleared: [], achieved: [], level: 1, exp: 0, gold: 0,
            items: { potion: 0, bomb: 0, hint: 0, pencil: 0, shield: 0, coin: 0 },
            totalSolved: 0, writeCount: 0
        };
        saveGame();
        
        // メモリリセット
        gameState = {
            mode: '', stageId: 1, queue: [], qIndex: 0, score: 0, combo: 0, mistakes: [],
            hp: 3, maxHp: 3, expGained: 0, goldGained: 0, endlessWave: 0,
            writeCorrectCount: 0, shieldActive: false, pencilUsed: false, coinActive: false, debugClicks: 0
        };
        
        showScreen('screen-title');
        updateStageList();
        updateTitleStats();
        alert("データを初期化しました。");
    } 
}
