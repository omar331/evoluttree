## Deploying

Evoluttree uses [shipitjs](https://github.com/shipitjs/shipit) as deploy tool.

If want to deploy evoluttree to somewhere else, just copy ```shipitfile.js.DIST``` as ```shipitfile.js```, customize it for yor configuration.
You must have **git** installed in your environment.

Be sure you have made the distribution folder

```npm run make:dist```

and then deploy your application you can use commands like

```npm run deploy:staging```    (for a staging server)

```npm run deploy:production```   (for a production server)

and so on.


### TODO

Embed ```make:dist``` task into the deploy task. Any help is highly appreciated :)


