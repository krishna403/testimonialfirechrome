
<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('header.php') ?>
        <title>Record Video</title>
        
        <style>
            audio {
                vertical-align: bottom;
                width: 10em;
            }

            video { vertical-align: top;max-width: 100%; }

            input {
                border: 1px solid #d9d9d9;
                border-radius: 1px;
                font-size: 2em;
                margin: .2em;
                width: 30%;
            }

            p, .inner { padding: 1em; }

            li {
                border-bottom: 1px solid rgb(189, 189, 189);
                border-left: 1px solid rgb(189, 189, 189);
                padding: .5em;
            }
            label {
                display: inline-block;
                width: 8em;
            }
        </style>
        <script>
            document.createElement('article');
            document.createElement('footer');
        </script>
        <!-- script used for audio/video/gif recording -->
        <script src="js/record.js"> </script>
    </head>

    <body>
        <article>
            <section class="experiment">  
               <fieldset><legend><font color='black'  size="3"><b style="font-family:  'Hoefler Text', Georgia, 'Times New Roman', serif;">RECORDING </b></font> </legend>
              <!--  <h2 class="header">Recording</h2>-->
			
				<p style="text-align:center;">
                                    <video id="preview" controls style="border: 1px solid rgb(15, 158, 238); height: 360px; width: 520px; background-color:gray;"></video> <br/>
				</p>
				<hr />

                                <button id="record" style="height: 40px; width: 180px;">Record &RightTriangleBar;</button>
                                <button id="stop" style="height: 40px; width: 180px;" disabled>Stop &FilledSmallSquare;</button>
				<button id="delete" style="height: 40px; width: 180px;" disabled>Delete files</button>

				<div id="container" style="padding:1em 2em;"></div>
               </fieldset>               
            </section>
			   
            <script src="js/control.js"> </script>
        </article>
    </body>
    <?php include('footer.html')?>
</html>


