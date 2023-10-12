import { join } from 'path';
import pkg from 'webpack';
import path from 'path';
import fs from 'fs';
const { HotModuleReplacementPlugin } = pkg;
import HtmlWebpackPlugin from 'html-webpack-plugin';



export default {
    devServer: {
        host: 'localhost',
        port: 3000,

        https: {
            key: fs.readFileSync('/Users/sudheer2701/localhost.key'),
            cert: fs.readFileSync('/Users/sudheer2701/localhost.crt'),
        },
        hot: true,

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new HotModuleReplacementPlugin(),
    ]
}