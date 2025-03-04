import config from "@colyseus/tools";

/**
 * Import your Room files
 */
import { TavernRoom } from "./rooms/TavernRoom";

export default config({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('tavern_room', TavernRoom);
    },

    initializeExpress: (app) => {
        // /**
        //  * Use @colyseus/playground
        //  * (It is not recommended to expose this route in a production environment)
        //  */
        // if (process.env.NODE_ENV !== "production") {
        //     app.use("/", playground);
        // }

        // /**
        //  * Use @colyseus/monitor
        //  * It is recommended to protect this route with a password
        //  * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
        //  */
        // app.use("/colyseus", monitor());
    },


    beforeListen: () => { }
});
