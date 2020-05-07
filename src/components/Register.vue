<template>
  <div>
    <v-toolbar flat fixed app clipped-right>
      <div class="align-center justify-center"><img src="@/assets/symbol.svg"/><img src="@/assets/name.svg" class="hidden-sm-and-down" style="position:relative;top:-5px;left:10px"/></div>
      <v-spacer></v-spacer>
      <v-btn class="sb-btn-round long-btn bold" color="primary" @click="validate()">
        <span v-if="step === 1">Continue to Step 2</span>
        <span v-if="step === 2">Validate</span>
      </v-btn>
    </v-toolbar>
    <div class="mb-5"></div>
    <v-container fluid fill-height class="no-padding">
      <v-layout align-center justify-center wrap row>
        <v-flex xs12 class="mb-5">
          <div class="text-xs-center">
            <p class="subheading bold gray--text">Step {{step}} of 2</p>
          </div>
          <div :class="'sb-wrap active-step'+step">
            <div class="sb-main">
              <div class="step-col step-col-2">
                <div class="sb-step-cont">
                  <div class="sb-step step-1"></div>
                  <span :class="step === 2 ? 'primary--text sb-label bold' : 'sb-label bold'">Create Your Profile</span>
                </div>
              </div>
              <div class="step-col step-col-2">
                <div class="sb-step-cont">
                  <div class="sb-step step-2"></div>
                  <span :class="step === 2 ? 'sb-label gray--text bold' : 'sb-label gray--text'">Validate Your Email</span>
                </div>
              </div>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 class="mb-2" v-if="step === 1">
          <v-container fluid fill-height class="no-padding">
            <v-layout align-center justify-center wrap row>
              <v-flex xs12 sm8 md6> 
                <v-card class="ma-3">
                  <v-card-title primary-title>
                    <div>
                      <div class="form-title bold gray--text">Personal Info</div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form class="register-form" ref="personInfoForm">
                      <v-container fluid fill-height>
                        <v-layout align-center justify-center wrap row>
                          <v-flex xs12 sm6>
                            <p class="gray--text">First Name</p>
                            <v-text-field
                              :validate-on-blur="true"
                              solo
                              v-model.trim="firstName"
                              :rules="firstNameRules"
                              required
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <p class="gray--text">Last Name</p>
                            <v-text-field
                              :validate-on-blur="true"
                              solo
                              v-model.trim="lastName"
                              :rules="lastNameRules"
                              required
                              type="text"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <v-container>
                        <v-layout align-center justify-center wrap row>
                          <v-flex xs12 sm6>
                            <p class="gray--text">Email</p>
                            <v-text-field
                              :validate-on-blur="true"
                              solo
                              v-model.trim="email"
                              :rules="emailRules"
                              required
                              type="text"
                              hint="Verification will be sent to this address."
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <p class="gray--text">Phone Number</p>
                            <v-text-field
                              :validate-on-blur="true"
                              mask="phone"
                              solo
                              v-model.trim="phone"
                              :rules="phoneRules"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <v-container>
                        <v-layout align-center justify-center wrap row>
                          <v-flex xs12 sm6>
                            <p class="gray--text">Password</p>
                            <v-text-field
                              hint="8-32 characters"
                              :validate-on-blur="true"
                              solo
                              v-model.trim="password"
                              :rules="passwordRules"
                              required
                              :type="showPassword ? 'text' : 'password'"
                              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                              @click:append="showPassword = !showPassword"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <p class="gray--text">Confirm Password</p>
                            <v-text-field
                              solo
                              type="password"
                              v-model.trim="confirmPassword"
                              required
                              :error="passwordMatch === false"
                              :error-messages="passwordError"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 class="mb-5" v-if="step === 1">
          <v-container fluid fill-height class="no-padding">
            <v-layout align-center justify-center wrap row>
              <v-flex xs12 sm8 md6> 
                <v-card class="ma-3">
                  <v-card-title primary-title>
                    <div>
                      <div class="form-title bold gray--text">Organization Info</div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form class="register-form" ref="orgInfoForm">
                      <v-container fluid fill-height>
                        <v-layout align-center justify-center wrap row>
                          <v-flex xs12 sm6>
                            <p class="gray--text">Organization Name</p>
                            <v-text-field
                              :validate-on-blur="true"
                              solo
                              v-model.trim="orgName"
                              :rules="orgNameRules"
                              required
                              type="text"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <p class="gray--text">Organization Phone Number</p>
                            <v-text-field
                              :validate-on-blur="true"
                              mask="phone"
                              solo
                              v-model.trim="orgPhone"
                              :rules="phoneRules"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <v-container style="padding-bottom:0;padding-top:0">
                        <v-flex xs12>
                          <p class="gray--text" style="margin:0">Organization Type</p>
                        </v-flex>
                      </v-container>
                      <v-container fluid fill-height style="padding-top:0">
                        <v-layout align-center justify-center wrap row>
                          <v-flex xs12 sm6>
                            <v-radio-group v-model="orgType" column hide-details>
                              <v-radio color="primary" label="Corporation" :value="1"></v-radio>
                              <v-radio color="primary" label="Small Business" :value="2"></v-radio>
                              <v-radio color="primary" label="Non-Profit Business" :value="3"></v-radio>
                            </v-radio-group>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-radio-group v-model="orgType" column hide-details>
                              <v-radio color="primary" label="Government Entity" :value="4"></v-radio>
                              <v-radio color="primary" label="Consortium" :value="5"></v-radio>
                              <v-radio color="primary" label="Individual" :value="6"></v-radio>
                            </v-radio-group>
                          </v-flex>
                          <v-flex xs12>
                            <v-slide-y-transition mode="out-in" origin="center center">
                              <div class="v-text-field__details" v-if="noOrgType">
                                <div class="v-messages theme--light error--text">
                                  <div class="v-messages__wrapper">
                                    <div class="v-messages__message">Organization type is required</div>
                                  </div>
                                </div>
                              </div>
                            </v-slide-y-transition>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <div class="text-xs-center">
            <p>Already have an authentication code? <router-link to="/validate">Click here</router-link></p>
            <v-btn small @click="fake()">Debug: fill with fake data</v-btn>
          </div>
        </v-flex>
        <v-container fluid fill-height class="no-padding" v-if="step === 2">
          <v-layout align-center justify-center wrap row>
            <v-flex xs12 sm8 md6> 
              <v-card class="ma-3">
                <v-card-title primary-title>
                  <div>
                    <div class="form-title bold gray--text">Validate Your Email</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <p class="gray--text">An email has been sent to the address you provided. Please enter the authentication code included in that email.</p>
                  <v-form class="register-form" ref="authForm">
                    <v-container fluid fill-height>
                      <v-layout align-center justify-center wrap row>
                        <v-flex xs12 sm6>
                          <p class="gray--text">Authentication Code</p>
                          <v-text-field
                            :rules="authRules"
                            :validate-on-blur="true"
                            solo
                            v-model.trim="authCode"
                            required
                            type="text"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <p class="gray--text">Password</p>
                          <v-text-field
                            :rules="passwordAuthRules"
                            :validate-on-blur="true"
                            solo
                            v-model.trim="authPassword"
                            required
                            :type="showAuthPassword ? 'text' : 'password'"
                            :append-icon="showAuthPassword ? 'visibility' : 'visibility_off'"
                            @click:append="showAuthPassword = !showAuthPassword"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    authPassword: '',
    confirmPassword: '',
    passwordError: '',
    showPassword: false,
    showAuthPassword: false,
    orgName: '',
    orgPhone: '',
    orgType: null,
    noOrgType: false,
    authCode: null,
    firstNameRules: [
      v => !!v || 'First Name is required',
      v => /[a-zA-Z][^#&<>\\"~;$^%{}?0-9]{1,20}$/.test(v) || 'Invalid First Name'
    ],
    lastNameRules: [
      v => !!v || 'Last Name is required',
      v => /[a-zA-Z][^#&<>\\"~;$^%{}?0-9]{1,20}$/.test(v) || 'Invalid Last Name'
    ],
    orgNameRules: [
      v => !!v || 'Organization Name is required',
      v => /[a-zA-Z][^#&<>\\"~;$^%{}?0-9]{1,20}$/.test(v) || 'Invalid Organization Name'
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Invalid Email'
    ],
    phoneRules: [
      v => !!v || 'Phone Number is required',
      v => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) || 'Invalid Phone Number'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >=8 && v.length <= 32 || 'Passwords should be 8 to 32 characters long'
    ],
    authRules: [
      v => !!v || 'Authentication code is required'
    ],
    passwordAuthRules: [
      v => !!v || 'Password is required'
    ]
  }),
  created () {

  },
  methods: {
    fake: function () {
      const vm = this;
      function capFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      function generateName() {
        // name list: https://gist.github.com/tkon99/4c98af713acc73bed74c
        var name1 = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing","agreeable","ajar","alarmed","alarming","alert","alienated","alive","all","altruistic","amazing","ambitious","ample","amused","amusing","anchored","ancient","angelic","angry","anguished","animated","annual","another","antique","anxious","any","apprehensive","appropriate","apt","arctic","arid","aromatic","artistic","ashamed","assured","astonishing","athletic","attached","attentive","attractive","austere","authentic","authorized","automatic","avaricious","average","aware","awesome","awful","awkward","babyish","bad","back","baggy","bare","barren","basic","beautiful","belated","beloved","beneficial","better","best","bewitched","big","big-hearted","biodegradable","bite-sized","bitter","black","black-and-white","bland","blank","blaring","bleak","blind","blissful","blond","blue","blushing","bogus","boiling","bold","bony","boring","bossy","both","bouncy","bountiful","bowed","brave","breakable","brief","bright","brilliant","brisk","broken","bronze","brown","bruised","bubbly","bulky","bumpy","buoyant","burdensome","burly","bustling","busy","buttery","buzzing","calculating","calm","candid","canine","capital","carefree","careful","careless","caring","cautious","cavernous","celebrated","charming","cheap","cheerful","cheery","chief","chilly","chubby","circular","classic","clean","clear","clear-cut","clever","close","closed","cloudy","clueless","clumsy","cluttered","coarse","cold","colorful","colorless","colossal","comfortable","common","compassionate","competent","complete","complex","complicated","composed","concerned","concrete","confused","conscious","considerate","constant","content","conventional","cooked","cool","cooperative","coordinated","corny","corrupt","costly","courageous","courteous","crafty","crazy","creamy","creative","creepy","criminal","crisp","critical","crooked","crowded","cruel","crushing","cuddly","cultivated","cultured","cumbersome","curly","curvy","cute","cylindrical","damaged","damp","dangerous","dapper","daring","darling","dark","dazzling","dead","deadly","deafening","dear","dearest","decent","decimal","decisive","deep","defenseless","defensive","defiant","deficient","definite","definitive","delayed","delectable","delicious","delightful","delirious","demanding","dense","dental","dependable","dependent","descriptive","deserted","detailed","determined","devoted","different","difficult","digital","diligent","dim","dimpled","dimwitted","direct","disastrous","discrete","disfigured","disgusting","disloyal","dismal","distant","downright","dreary","dirty","disguised","dishonest","dismal","distant","distinct","distorted","dizzy","dopey","doting","double","downright","drab","drafty","dramatic","dreary","droopy","dry","dual","dull","dutiful","each","eager","earnest","early","easy","easy-going","ecstatic","edible","educated","elaborate","elastic","elated","elderly","electric","elegant","elementary","elliptical","embarrassed","embellished","eminent","emotional","empty","enchanted","enchanting","energetic","enlightened","enormous","enraged","entire","envious","equal","equatorial","essential","esteemed","ethical","euphoric","even","evergreen","everlasting","every","evil","exalted","excellent","exemplary","exhausted","excitable","excited","exciting","exotic","expensive","experienced","expert","extraneous","extroverted","extra-large","extra-small","fabulous","failing","faint","fair","faithful","fake","false","familiar","famous","fancy","fantastic","far","faraway","far-flung","far-off","fast","fat","fatal","fatherly","favorable","favorite","fearful","fearless","feisty","feline","female","feminine","few","fickle","filthy","fine","finished","firm","first","firsthand","fitting","fixed","flaky","flamboyant","flashy","flat","flawed","flawless","flickering","flimsy","flippant","flowery","fluffy","fluid","flustered","focused","fond","foolhardy","foolish","forceful","forked","formal","forsaken","forthright","fortunate","fragrant","frail","frank","frayed","free","French","fresh","frequent","friendly","frightened","frightening","frigid","frilly","frizzy","frivolous","front","frosty","frozen","frugal","fruitful","full","fumbling","functional","funny","fussy","fuzzy","gargantuan","gaseous","general","generous","gentle","genuine","giant","giddy","gigantic","gifted","giving","glamorous","glaring","glass","gleaming","gleeful","glistening","glittering","gloomy","glorious","glossy","glum","golden","good","good-natured","gorgeous","graceful","gracious","grand","grandiose","granular","grateful","grave","gray","great","greedy","green","gregarious","grim","grimy","gripping","grizzled","gross","grotesque","grouchy","grounded","growing","growling","grown","grubby","gruesome","grumpy","guilty","gullible","gummy","hairy","half","handmade","handsome","handy","happy","happy-go-lucky","hard","hard-to-find","harmful","harmless","harmonious","harsh","hasty","hateful","haunting","healthy","heartfelt","hearty","heavenly","heavy","hefty","helpful","helpless","hidden","hideous","high","high-level","hilarious","hoarse","hollow","homely","honest","honorable","honored","hopeful","horrible","hospitable","hot","huge","humble","humiliating","humming","humongous","hungry","hurtful","husky","icky","icy","ideal","idealistic","identical","idle","idiotic","idolized","ignorant","ill","illegal","ill-fated","ill-informed","illiterate","illustrious","imaginary","imaginative","immaculate","immaterial","immediate","immense","impassioned","impeccable","impartial","imperfect","imperturbable","impish","impolite","important","impossible","impractical","impressionable","impressive","improbable","impure","inborn","incomparable","incompatible","incomplete","inconsequential","incredible","indelible","inexperienced","indolent","infamous","infantile","infatuated","inferior","infinite","informal","innocent","insecure","insidious","insignificant","insistent","instructive","insubstantial","intelligent","intent","intentional","interesting","internal","international","intrepid","ironclad","irresponsible","irritating","itchy","jaded","jagged","jam-packed","jaunty","jealous","jittery","joint","jolly","jovial","joyful","joyous","jubilant","judicious","juicy","jumbo","junior","jumpy","juvenile","kaleidoscopic","keen","key","kind","kindhearted","kindly","klutzy","knobby","knotty","knowledgeable","knowing","known","kooky","kosher","lame","lanky","large","last","lasting","late","lavish","lawful","lazy","leading","lean","leafy","left","legal","legitimate","light","lighthearted","likable","likely","limited","limp","limping","linear","lined","liquid","little","live","lively","livid","loathsome","lone","lonely","long","long-term","loose","lopsided","lost","loud","lovable","lovely","loving","low","loyal","lucky","lumbering","luminous","lumpy","lustrous","luxurious","mad","made-up","magnificent","majestic","major","male","mammoth","married","marvelous","masculine","massive","mature","meager","mealy","mean","measly","meaty","medical","mediocre","medium","meek","mellow","melodic","memorable","menacing","merry","messy","metallic","mild","milky","mindless","miniature","minor","minty","miserable","miserly","misguided","misty","mixed","modern","modest","moist","monstrous","monthly","monumental","moral","mortified","motherly","motionless","mountainous","muddy","muffled","multicolored","mundane","murky","mushy","musty","muted","mysterious","naive","narrow","nasty","natural","naughty","nautical","near","neat","necessary","needy","negative","neglected","negligible","neighboring","nervous","new","next","nice","nifty","nimble","nippy","nocturnal","noisy","nonstop","normal","notable","noted","noteworthy","novel","noxious","numb","nutritious","nutty","obedient","obese","oblong","oily","oblong","obvious","occasional","odd","oddball","offbeat","offensive","official","old","old-fashioned","only","open","optimal","optimistic","opulent","orange","orderly","organic","ornate","ornery","ordinary","original","other","our","outlying","outgoing","outlandish","outrageous","outstanding","oval","overcooked","overdue","overjoyed","overlooked","palatable","pale","paltry","parallel","parched","partial","passionate","past","pastel","peaceful","peppery","perfect","perfumed","periodic","perky","personal","pertinent","pesky","pessimistic","petty","phony","physical","piercing","pink","pitiful","plain","plaintive","plastic","playful","pleasant","pleased","pleasing","plump","plush","polished","polite","political","pointed","pointless","poised","poor","popular","portly","posh","positive","possible","potable","powerful","powerless","practical","precious","present","prestigious","pretty","precious","previous","pricey","prickly","primary","prime","pristine","private","prize","probable","productive","profitable","profuse","proper","proud","prudent","punctual","pungent","puny","pure","purple","pushy","putrid","puzzled","puzzling","quaint","qualified","quarrelsome","quarterly","queasy","querulous","questionable","quick","quick-witted","quiet","quintessential","quirky","quixotic","quizzical","radiant","ragged","rapid","rare","rash","raw","recent","reckless","rectangular","ready","real","realistic","reasonable","red","reflecting","regal","regular","reliable","relieved","remarkable","remorseful","remote","repentant","required","respectful","responsible","repulsive","revolving","rewarding","rich","rigid","right","ringed","ripe","roasted","robust","rosy","rotating","rotten","rough","round","rowdy","royal","rubbery","rundown","ruddy","rude","runny","rural","rusty","sad","safe","salty","same","sandy","sane","sarcastic","sardonic","satisfied","scaly","scarce","scared","scary","scented","scholarly","scientific","scornful","scratchy","scrawny","second","secondary","second-hand","secret","self-assured","self-reliant","selfish","sentimental","separate","serene","serious","serpentine","several","severe","shabby","shadowy","shady","shallow","shameful","shameless","sharp","shimmering","shiny","shocked","shocking","shoddy","short","short-term","showy","shrill","shy","sick","silent","silky","silly","silver","similar","simple","simplistic","sinful","single","sizzling","skeletal","skinny","sleepy","slight","slim","slimy","slippery","slow","slushy","small","smart","smoggy","smooth","smug","snappy","snarling","sneaky","sniveling","snoopy","sociable","soft","soggy","solid","somber","some","spherical","sophisticated","sore","sorrowful","soulful","soupy","sour","Spanish","sparkling","sparse","specific","spectacular","speedy","spicy","spiffy","spirited","spiteful","splendid","spotless","spotted","spry","square","squeaky","squiggly","stable","staid","stained","stale","standard","starchy","stark","starry","steep","sticky","stiff","stimulating","stingy","stormy","straight","strange","steel","strict","strident","striking","striped","strong","studious","stunning","stupendous","stupid","sturdy","stylish","subdued","submissive","substantial","subtle","suburban","sudden","sugary","sunny","super","superb","superficial","superior","supportive","sure-footed","surprised","suspicious","svelte","sweaty","sweet","sweltering","swift","sympathetic","tall","talkative","tame","tan","tangible","tart","tasty","tattered","taut","tedious","teeming","tempting","tender","tense","tepid","terrible","terrific","testy","thankful","that","these","thick","thin","third","thirsty","this","thorough","thorny","those","thoughtful","threadbare","thrifty","thunderous","tidy","tight","timely","tinted","tiny","tired","torn","total","tough","traumatic","treasured","tremendous","tragic","trained","tremendous","triangular","tricky","trifling","trim","trivial","troubled","true","trusting","trustworthy","trusty","truthful","tubby","turbulent","twin","ugly","ultimate","unacceptable","unaware","uncomfortable","uncommon","unconscious","understated","unequaled","uneven","unfinished","unfit","unfolded","unfortunate","unhappy","unhealthy","uniform","unimportant","unique","united","unkempt","unknown","unlawful","unlined","unlucky","unnatural","unpleasant","unrealistic","unripe","unruly","unselfish","unsightly","unsteady","unsung","untidy","untimely","untried","untrue","unused","unusual","unwelcome","unwieldy","unwilling","unwitting","unwritten","upbeat","upright","upset","urban","usable","used","useful","useless","utilized","utter","vacant","vague","vain","valid","valuable","vapid","variable","vast","velvety","venerated","vengeful","verifiable","vibrant","vicious","victorious","vigilant","vigorous","villainous","violet","violent","virtual","virtuous","visible","vital","vivacious","vivid","voluminous","wan","warlike","warm","warmhearted","warped","wary","wasteful","watchful","waterlogged","watery","wavy","wealthy","weak","weary","webbed","wee","weekly","weepy","weighty","weird","welcome","well-documented","well-groomed","well-informed","well-lit","well-made","well-off","well-to-do","well-worn","wet","which","whimsical","whirlwind","whispered","white","whole","whopping","wicked","wide","wide-eyed","wiggly","wild","willing","wilted","winding","windy","winged","wiry","wise","witty","wobbly","woeful","wonderful","wooden","woozy","wordy","worldly","worn","worried","worrisome","worse","worst","worthless","worthwhile","worthy","wrathful","wretched","writhing","wrong","wry","yawning","yearly","yellow","yellowish","young","youthful","yummy","zany","zealous","zesty","zigzag","rocky"];
        var name2 = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love","internet","television","science","library","nature","fact","product","idea","temperature","investment","area","society","activity","story","industry","media","thing","oven","community","definition","safety","quality","development","language","management","player","variety","video","week","security","country","exam","movie","organization","equipment","physics","analysis","policy","series","thought","basis","boyfriend","direction","strategy","technology","army","camera","freedom","paper","environment","child","instance","month","truth","marketing","university","writing","article","department","difference","goal","news","audience","fishing","growth","income","marriage","user","combination","failure","meaning","medicine","philosophy","teacher","communication","night","chemistry","disease","disk","energy","nation","road","role","soup","advertising","location","success","addition","apartment","education","math","moment","painting","politics","attention","decision","event","property","shopping","student","wood","competition","distribution","entertainment","office","population","president","unit","category","cigarette","context","introduction","opportunity","performance","driver","flight","length","magazine","newspaper","relationship","teaching","cell","dealer","debate","finding","lake","member","message","phone","scene","appearance","association","concept","customer","death","discussion","housing","inflation","insurance","mood","woman","advice","blood","effort","expression","importance","opinion","payment","reality","responsibility","situation","skill","statement","wealth","application","city","county","depth","estate","foundation","grandmother","heart","perspective","photo","recipe","studio","topic","collection","depression","imagination","passion","percentage","resource","setting","ad","agency","college","connection","criticism","debt","description","memory","patience","secretary","solution","administration","aspect","attitude","director","personality","psychology","recommendation","response","selection","storage","version","alcohol","argument","complaint","contract","emphasis","highway","loss","membership","possession","preparation","steak","union","agreement","cancer","currency","employment","engineering","entry","interaction","limit","mixture","preference","region","republic","seat","tradition","virus","actor","classroom","delivery","device","difficulty","drama","election","engine","football","guidance","hotel","match","owner","priority","protection","suggestion","tension","variation","anxiety","atmosphere","awareness","bread","climate","comparison","confusion","construction","elevator","emotion","employee","employer","guest","height","leadership","mall","manager","operation","recording","respect","sample","transportation","boring","charity","cousin","disaster","editor","efficiency","excitement","extent","feedback","guitar","homework","leader","mom","outcome","permission","presentation","promotion","reflection","refrigerator","resolution","revenue","session","singer","tennis","basket","bonus","cabinet","childhood","church","clothes","coffee","dinner","drawing","hair","hearing","initiative","judgment","lab","measurement","mode","mud","orange","poetry","police","possibility","procedure","queen","ratio","relation","restaurant","satisfaction","sector","signature","significance","song","tooth","town","vehicle","volume","wife","accident","airport","appointment","arrival","assumption","baseball","chapter","committee","conversation","database","enthusiasm","error","explanation","farmer","gate","girl","hall","historian","hospital","injury","instruction","maintenance","manufacturer","meal","perception","pie","poem","presence","proposal","reception","replacement","revolution","river","son","speech","tea","village","warning","winner","worker","writer","assistance","breath","buyer","chest","chocolate","conclusion","contribution","cookie","courage","desk","drawer","establishment","examination","garbage","grocery","honey","impression","improvement","independence","insect","inspection","inspector","king","ladder","menu","penalty","piano","potato","profession","professor","quantity","reaction","requirement","salad","sister","supermarket","tongue","weakness","wedding","affair","ambition","analyst","apple","assignment","assistant","bathroom","bedroom","beer","birthday","celebration","championship","cheek","client","consequence","departure","diamond","dirt","ear","fortune","friendship","funeral","gene","girlfriend","hat","indication","intention","lady","midnight","negotiation","obligation","passenger","pizza","platform","poet","pollution","recognition","reputation","shirt","speaker","stranger","surgery","sympathy","tale","throat","trainer","uncle","youth","time","work","film","water","money","example","while","business","study","game","life","form","air","day","place","number","part","field","fish","back","process","heat","hand","experience","job","book","end","point","type","home","economy","value","body","market","guide","interest","state","radio","course","company","price","size","card","list","mind","trade","line","care","group","risk","word","fat","force","key","light","training","name","school","top","amount","level","order","practice","research","sense","service","piece","web","boss","sport","fun","house","page","term","test","answer","sound","focus","matter","kind","soil","board","oil","picture","access","garden","range","rate","reason","future","site","demand","exercise","image","case","cause","coast","action","age","bad","boat","record","result","section","building","mouse","cash","class","period","plan","store","tax","side","subject","space","rule","stock","weather","chance","figure","man","model","source","beginning","earth","program","chicken","design","feature","head","material","purpose","question","rock","salt","act","birth","car","dog","object","scale","sun","note","profit","rent","speed","style","war","bank","craft","half","inside","outside","standard","bus","exchange","eye","fire","position","pressure","stress","advantage","benefit","box","frame","issue","step","cycle","face","item","metal","paint","review","room","screen","structure","view","account","ball","discipline","medium","share","balance","bit","black","bottom","choice","gift","impact","machine","shape","tool","wind","address","average","career","culture","morning","pot","sign","table","task","condition","contact","credit","egg","hope","ice","network","north","square","attempt","date","effect","link","post","star","voice","capital","challenge","friend","self","shot","brush","couple","exit","front","function","lack","living","plant","plastic","spot","summer","taste","theme","track","wing","brain","button","click","desire","foot","gas","influence","notice","rain","wall","base","damage","distance","feeling","pair","savings","staff","sugar","target","text","animal","author","budget","discount","file","ground","lesson","minute","officer","phase","reference","register","sky","stage","stick","title","trouble","bowl","bridge","campaign","character","club","edge","evidence","fan","letter","lock","maximum","novel","option","pack","park","quarter","skin","sort","weight","baby","background","carry","dish","factor","fruit","glass","joint","master","muscle","red","strength","traffic","trip","vegetable","appeal","chart","gear","ideal","kitchen","land","log","mother","net","party","principle","relative","sale","season","signal","spirit","street","tree","wave","belt","bench","commission","copy","drop","minimum","path","progress","project","sea","south","status","stuff","ticket","tour","angle","blue","breakfast","confidence","daughter","degree","doctor","dot","dream","duty","essay","father","fee","finance","hour","juice","luck","milk","mouth","peace","pipe","stable","storm","substance","team","trick","afternoon","bat","beach","blank","catch","chain","consideration","cream","crew","detail","gold","interview","kid","mark","mission","pain","pleasure","score","screw","sex","shop","shower","suit","tone","window","agent","band","bath","block","bone","calendar","candidate","cap","coat","contest","corner","court","cup","district","door","east","finger","garage","guarantee","hole","hook","implement","layer","lecture","lie","manner","meeting","nose","parking","partner","profile","rice","routine","schedule","swimming","telephone","tip","winter","airline","bag","battle","bed","bill","bother","cake","code","curve","designer","dimension","dress","ease","emergency","evening","extension","farm","fight","gap","grade","holiday","horror","horse","host","husband","loan","mistake","mountain","nail","noise","occasion","package","patient","pause","phrase","proof","race","relief","sand","sentence","shoulder","smoke","stomach","string","tourist","towel","vacation","west","wheel","wine","arm","aside","associate","bet","blow","border","branch","breast","brother","buddy","bunch","chip","coach","cross","document","draft","dust","expert","floor","god","golf","habit","iron","judge","knife","landscape","league","mail","mess","native","opening","parent","pattern","pin","pool","pound","request","salary","shame","shelter","shoe","silver","tackle","tank","trust","assist","bake","bar","bell","bike","blame","boy","brick","chair","closet","clue","collar","comment","conference","devil","diet","fear","fuel","glove","jacket","lunch","monitor","mortgage","nurse","pace","panic","peak","plane","reward","row","sandwich","shock","spite","spray","surprise","till","transition","weekend","welcome","yard","alarm","bend","bicycle","bite","blind","bottle","cable","candle","clerk","cloud","concert","counter","flower","grandfather","harm","knee","lawyer","leather","load","mirror","neck","pension","plate","purple","ruin","ship","skirt","slice","snow","specialist","stroke","switch","trash","tune","zone","anger","award","bid","bitter","boot","bug","camp","candy","carpet","cat","champion","channel","clock","comfort","cow","crack","engineer","entrance","fault","grass","guy","hell","highlight","incident","island","joke","jury","leg","lip","mate","motor","nerve","passage","pen","pride","priest","prize","promise","resident","resort","ring","roof","rope","sail","scheme","script","sock","station","toe","tower","truck","witness","can","will","other","use","make","good","look","help","go","great","being","still","public","read","keep","start","give","human","local","general","specific","long","play","feel","high","put","common","set","change","simple","past","big","possible","particular","major","personal","current","national","cut","natural","physical","show","try","check","second","call","move","pay","let","increase","single","individual","turn","ask","buy","guard","hold","main","offer","potential","professional","international","travel","cook","alternative","special","working","whole","dance","excuse","cold","commercial","low","purchase","deal","primary","worth","fall","necessary","positive","produce","search","present","spend","talk","creative","tell","cost","drive","green","support","glad","remove","return","run","complex","due","effective","middle","regular","reserve","independent","leave","original","reach","rest","serve","watch","beautiful","charge","active","break","negative","safe","stay","visit","visual","affect","cover","report","rise","walk","white","junior","pick","unique","classic","final","lift","mix","private","stop","teach","western","concern","familiar","fly","official","broad","comfortable","gain","rich","save","stand","young","heavy","lead","listen","valuable","worry","handle","leading","meet","release","sell","finish","normal","press","ride","secret","spread","spring","tough","wait","brown","deep","display","flow","hit","objective","shoot","touch","cancel","chemical","cry","dump","extreme","push","conflict","eat","fill","formal","jump","kick","opposite","pass","pitch","remote","total","treat","vast","abuse","beat","burn","deposit","print","raise","sleep","somewhere","advance","consist","dark","double","draw","equal","fix","hire","internal","join","kill","sensitive","tap","win","attack","claim","constant","drag","drink","guess","minor","pull","raw","soft","solid","wear","weird","wonder","annual","count","dead","doubt","feed","forever","impress","repeat","round","sing","slide","strip","wish","combine","command","dig","divide","equivalent","hang","hunt","initial","march","mention","spiritual","survey","tie","adult","brief","crazy","escape","gather","hate","prior","repair","rough","sad","scratch","sick","strike","employ","external","hurt","illegal","laugh","lay","mobile","nasty","ordinary","respond","royal","senior","split","strain","struggle","swim","train","upper","wash","yellow","convert","crash","dependent","fold","funny","grab","hide","miss","permit","quote","recover","resolve","roll","sink","slip","spare","suspect","sweet","swing","twist","upstairs","usual","abroad","brave","calm","concentrate","estimate","grand","male","mine","prompt","quiet","refuse","regret","reveal","rush","shake","shift","shine","steal","suck","surround","bear","brilliant","dare","dear","delay","drunk","female","hurry","inevitable","invite","kiss","neat","pop","punch","quit","reply","representative","resist","rip","rub","silly","smile","spell","stretch","stupid","tear","temporary","tomorrow","wake","wrap","yesterday","Thomas","Tom","Lieuwe"];
        var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
        return name;
      }
      vm.firstName = generateName().split(' ')[0];
      vm.lastName = generateName().split(' ')[1];
      vm.email = generateName().split(' ')[0] + '.' + generateName().split(' ')[1] + '@email.com';
      vm.phone = Math.random().toString().slice(2,12);
      vm.password = 'j4CMkp!3fJx2e6i&BRjS';
      vm.confirmPassword = 'j4CMkp!3fJx2e6i&BRjS';
      vm.orgName = generateName();
      vm.orgPhone = Math.random().toString().slice(2,12);
      vm.orgType =  Math.floor((Math.random() * 6) + 1);
    },
    nextStep: function () {
      this.step++
    },
    validate: function () {
      const vm = this;
      if (vm.step === 2) {
        const authForm = vm.$refs.authForm.validate();
        if (authForm === true) {
          const content = {
            auth_token: vm.authCode,
            passwd: vm.authPassword
          };
          fetch('http://dev.api.strongblock.io/admin/register_que', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              return response.json().then(error => {
                throw new Error(error);
              });
            })
            .then(result => {

            })
            .catch(error => {
              alert(error.message)
            });
        } else {
          alert('Please enter authentication code and password')
          return
        }
      } else {
        if (vm.orgType === null) {
          vm.noOrgType = true;
        } else {
          vm.noOrgType = false;
        }
        const personal = vm.$refs.personInfoForm.validate();
        const org = vm.$refs.orgInfoForm.validate();
        if (personal === true && org === true && vm.orgType !== null) {
          vm.nextStep()
        }
      }
    },
    startAnimation: function () {

    },
    registerUser: function () {
      const vm = this;
      const content = {
        name_first: vm.firstName,
        name_last: vm.lastName,
        email: vm.email,
        phone: vm.phone,
        passwd: vm.password,
        name_org: vm.orgName,
        id_org_type: vm.orgType
      };
      fetch('http://dev.api.strongblock.io/admin/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then(error => {
            throw new Error(error);
          });
        })
        .then(result => {

        })
        .catch(error => {
          alert(error.message)
        });
    },
  },
  computed: {
    validEmail: function () {
      const vm = this;
      return /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(vm.email)
    },
    passwordMatch: function () {
      const vm = this;
      const match = vm.password === vm.confirmPassword;
      if (match === true) {
        vm.passwordError = '';
      } else {
        vm.passwordError = 'Passwords don\'t match';
      }
      return match
    },
  },
};
</script>

<style scoped>
.register-form p {
  font-size: 16px
}
.form-title {
  font-size: 20px
}
.sb-main {
  width: 100%;
  min-width: 320px;
  display: flex;
}
.step-col-2 {
  width: 50%;
  position: relative;
}
.step-col-3 {
  width: 33.333333333%;
  position: relative;
}
.step-col:first-child .sb-step:before {
  content: "1";
}
.step-col:nth-child(2) .sb-step:before {
  content: "2";
}
.step-col:nth-child(3) .sb-step:before {
  content: "3";
}
.sb-main .step-col:not(:first-child):before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 4px;
  top: 17.5px;
  left: calc(-51% + 20px);
  right: 0;
  background: #ebebeb;
  border: 2px #ebebeb solid;
  -o-transition: 0.4s;
  -ms-transition: 0.4s;
  -moz-transition: 0.4s;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.sb-step-cont {
  font-size: 16px;
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: space-between;
}
.sb-step {
  border: 5px #ebebeb solid;
  border-radius: 100%;
  line-height: 0;
  background: #959595;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: center;
  display: flex;
  color: #fff;
  width: 35px;
  height: 35px;
  font-weight: 700;
  margin-bottom: 7px;
  z-index: 4;
}
.sb-label {
  font-size: 14px;
  color: #343A40;
  width: 100%;
  text-align: center;
}
.active-step1 .step-col:first-child .sb-step,
.active-step1-mini2 .step-col:first-child .sb-step,
.active-step1-mini3 .step-col:first-child .sb-step {
  background-color: #1976d2;
}
.active-step1 .step-col:first-child .sb-label,
.active-step1-mini3 .step-col:first-child .sb-label,
.active-step1-mini2 .step-col:first-child .sb-label,
.active-step1-mini4 .step-col:first-child .sb-label {
  color: #2c2c2c;
}
.active-step2 .step-col:first-child,
.active-step3 .step-col:nth-child(-n + 2),
.active-step4 .step-col:nth-child(-n + 3) {
  opacity: 0.5;
}
.active-step2 .step-col:first-child .sb-step:before,
.active-step3 .step-col:nth-child(-n + 2) .sb-step:before,
.active-step4 .step-col:nth-child(-n + 3) .sb-step:before {
  content: "\2713";
  padding: 7px;
}
.active-step2 .step-col:nth-child(-n + 2) .sb-step,
.active-step3 .step-col:nth-child(-n + 3) .sb-step {
  background-color: #1976d2;
}
.active-step2 .step-col:nth-child(-n + 2) .sb-label,
.active-step3 .step-col:nth-child(-n + 3) .sb-label {
  color: #2c2c2c;
}
.active-step2 .step-col:nth-child(-n + 2):before,
.active-step3 .step-col:nth-child(-n + 3):before {
  background: #1976d2 !important;
}
@media screen and (max-width: 640px) {
  .sb-main {
    flex-wrap: wrap;
  }
}
</style>
