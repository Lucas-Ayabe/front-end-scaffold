module.exports = {
    plugins: [
        require("autoprefixer")({
            grid: "autoplace",
            flexbox: true,
        }),
        require("postcss-font-magician")({
            foundries: ["google"],
        }),
    ],
};
