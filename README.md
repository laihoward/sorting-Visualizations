# Sort Visualizing
使用三種sort algorithms排列，並且將sort algorithms過程的步驟視覺化。

![](https://i.imgur.com/18jWwFd.png)
## 建立React
一開始先在命令列程式中輸入，專案資料夾名稱為backend_connect_frontend
```javascript=
npx create-react-app sort_visualization
```
輸入以下的指令切換到backend_connect_frontend資料夾中，然後啟動網站伺服器
```javascript=
cd sort_visualization
npm start
```
在index.js中會去呼叫App.js，因此會在App.js中編寫主要的程式。
![](https://i.imgur.com/l8uFQsS.png)
```javascript=
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```