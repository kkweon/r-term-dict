import { injectGlobal } from "emotion";

injectGlobal`
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

html {
font-size: 16px;
}

* {
box-sizing: border-box;
}

body {
font-family: 'Spoqa Han Sans', sans-serif;

}

.text-danger {
color: red;
}
`;
