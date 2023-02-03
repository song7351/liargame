import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";
import VueCookies from "vue-cookies";

const API_URL = "http://127.0.0.1:5000";
// const API_URL = "http://i8a706.p.ssafy.io:8080";

const session = {
  myIdx: -1,
  isJoin: false,
  isReady: false,
  ovSession: {
    OV: undefined,
    session: undefined,
    // mainStreamManager: undefined,
    publisher: undefined,
  },
};

const sessions = [];

for (let i = 0; i < 10; i++) {
  let temp = Object.assign({}, session);
  sessions.push(temp);
}

// idx test
let bits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < 10; i++) {
  if (bits[i]) {
    // 접속테스트
    // sessions[i].isJoin = true;
    // 레디 테스트
    // sessions[i].isReady = false;
  }
}

export default createStore({
  state: {
    // 세션 구조(깊은 복사해서 사용)
    session: session,
    // idx위치의 세션의 상태
    sessions: sessions,
    // Object.assign(dest, this.state.session)

    // myIdx: -1,

    API_URL: "http://127.0.0.1:5000",
    // API_URL: "http://i8a706.p.ssafy.io:8080",
    isEnter: true, // 게임방 진입시 라우터가드를 위한 state
    isShow: false,
    accessToken: null,
    refreshToken: VueCookies.get("refreshToken"),
    // rooms: null, // rooms는 로비에서 방목록 8개 받아서 저장할곳.
    rooms: [
      // {
      //   id: 1,
      //   title: "감자고구마",
      //   maxCount: 6,
      //   curCount: 3,
      //   isPlaying: false,
      //   mode: "spy",
      //   isPrivate: true,
      // },
      // {
      //   id: 2,
      //   title: "감자고구마22",
      //   maxCount: 6,
      //   curCount: 4,
      //   isPlaying: true,
      //   mode: "normal",
      //   isPrivate: false,
      // },
    ],
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false;
    },
  },
  mutations: {
    // 회원가입 && 로그인
    SAVE_TOKEN(state, payload) {
      state.accessToken = payload.token;
      // state.refreshToken = payload.refreshToken;
      // VueCookies.set("accessToken", payload.token);
      VueCookies.set("refreshToken", payload.refreshToken);
      router.push({ name: "main" });
    },
    DELETE_TOKEN(state) {
      state.accessToken = null;
      state.refreshToken = null;
      VueCookies.remove("refreshToken");
      router.push({ name: "main" }).catch(() => {});
    },
    // 방목록 저장할 뮤테이션(rooms)
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
      router.push({ name: "lobby" });
    },
    // 라우터가드를 위한 isEnter 값 변경
    SET_ISENTER(state) {
      state.isEnter = true;
    },
    // 라우터가드를 위한 isEnter 값 초기화 - 인게임에 들어가면 실행시킬것.
    RESET_ISENTER(state) {
      state.isEnter = false;
    },
  },
  actions: {
    signUp(context, payload) {
      axios({
        method: "post",
        url: `${API_URL}/users/sign-up/`,
        data: {
          name: payload.name,
          password: payload.password,
          email: payload.email,
        },
      }).then((res) => {
        console.log(res);
        console.log(res.data);
      });
    },
    logIn(context, payload) {
      // console.log("test");
      axios({
        method: "post",
        url: `${API_URL}/users/login/`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      }).then((res) => {
        // context.commit("SAVE_TOKEN", res.data.key);
        // console.log(res.data.data.accessToken);
        const payload = {
          token: res.data.data.accessToken,
          refreshToken: res.data.data.refreshToken,
        };
        context.commit("SAVE_TOKEN", payload);
      });
    },
    logInKakao(context, payload) {
      // console.log(payload);
      context.commit("SAVE_TOKEN", payload);
    },
    logOut(context, payload) {
      console.log(API_URL);
      console.log(payload);
      axios({
        method: "post",
        url: `${API_URL}/logout`,
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
        data: {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
        },
      }).then((res) => {
        if (res) {
          console.log(res);
          context.commit("DELETE_TOKEN");
        }
      });
    },
    // 방목록 8개 받아오기
    setRooms(context, payload) {
      context.commit("SET_ROOMS", payload.rooms);
    },
    // 방진입 토큰 true
    setIsEnter(context) {
      context.commit("SET_ISENTER");
    },
    // 방진입 직후 토큰 false
    resetIsEnter(context) {
      context.commit("RESET_ISENTER");
    },
  },
  modules: {},
});
