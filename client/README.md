# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


//수정사항

1. 백엔드 서버를 구축하였습니다. 로그인 기능, 회원가입 및 인증 기능을 구현하였습니다. 

2. 제가 처음 작업한 파일(SignUp라우터가 없던 파일)에는 서버로 요청을  보내는 부분이 없었어요. 그래서 제가 직접 만들면서 하다보니 디비 연동하는 부분에서 수정한 부분이 있어요. mysql -> mongodb cloud를 사용하였습니다. 꼭 mysql을 사용하기 원하시면 코드를 수정하는 방법을 찾아보겠습니다.. 디비선택은 클라이언트단의 작업에는 영향을 미치지 않는 부분이어서 일단 그렇게 했습니다.

3. 클라이언트에서 리덕스, 리액트 훅 등을 사용하는 코드로 업데이트 하였습니다. 또는 주석을 참고해 주세요. 최신 문법이라서 일단 사용해 보았어요. 업데이트한 문법을 사용하기 원하지 않으시면 말씀해주세요.. 괜찮으시면 이 부분에서 궁금한 부분을 말씀해주세요. 또는 아래 영상을 참고해 주시기 바랍니다. 
https://www.youtube.com/watch?v=dJC_uAR7d60&list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T&index=26
26,27,28강입니다.

4. npm install --save
   cd client npm install --save
   cd..
   npm run dev 로 실행해주세요.