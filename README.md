# (这是一个玩具级框架)
demo代码，仅供参考 -. -

项目依赖是[pnpm](https://pnpm.io/)管理的，所以需要先安装一下
- npm install -g pnpm

安装依赖
- pnpm install

启动后端
- pnpm run server

启动前端
- pnpm run front

生成api文件 (需要在后端目录下执行命)
- cd ./packages/backend 
- pnpm run gen-api

由于是一个非常粗糙的demo，所以这个依赖注入有一些bug
- 因为ts并不是运行时环境，所以编译后类型信息会丢失，注入的变量名必须和类型一致，才能在容器中找到对应的依赖对象，例如使用```@Autowired```自动注入```LoginService```，目前变量名也只能写成```LoginService```
- 应该还有其他很多bug
    