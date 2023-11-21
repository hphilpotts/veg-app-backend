const { app } = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {

        if (PORT == undefined) {
                throw new Error('Environment variable `PORT` is undefined.');
        }

        try {
                console.log(`Album Review App is running on:\x1b[36m ${PORT} \x1b[0m`);
        } catch (error) {
                console.error(error);
        }
        
});