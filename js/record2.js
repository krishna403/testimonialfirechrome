 // PostBlob method uses XHR2 and FormData to submit 
        // recorded blob to the PHP server
        function PostBlob(blob, fileType, fileName) {
            // FormData
            var formData = new FormData();
            formData.append(fileType + '-filename', fileName);
            formData.append(fileType + '-blob', blob);

            // progress-bar
            var hr = document.createElement('hr');
            container.appendChild(hr);
            var strong = document.createElement('strong');
            strong.id = 'percentage';
            strong.innerHTML = fileType + ' upload progress: ';
            container.appendChild(strong);
            var progress = document.createElement('progress');
            container.appendChild(progress);

            // POST the Blob using XHR2
            xhr('save.php', formData, progress, percentage, function(fileURL) {
                alert(fileURL);
                
                container.appendChild(document.createElement('hr'));
                var mediaElement = document.createElement(fileType);

                var source = document.createElement('source');
                var href = location.href.substr(0, location.href.lastIndexOf('/') + 1);
                source.src = href + fileURL;

                if (fileType == 'video') source.type = !!navigator.mozGetUserMedia ? 'video/webm' : 'video/webm; codecs="vp8, vorbis"';
                if (fileType == 'audio') source.type = !!navigator.mozGetUserMedia ? 'audio/ogg' : 'audio/wav';

                mediaElement.appendChild(source);

                mediaElement.controls = true;
                container.appendChild(mediaElement);
                mediaElement.play();

                progress.parentNode.removeChild(progress);
                strong.parentNode.removeChild(strong);
                hr.parentNode.removeChild(hr);
            });
        }

        var record = document.getElementById('record');
        var stop = document.getElementById('stop');
        var deleteFiles = document.getElementById('delete');

        var audio = document.querySelector('audio');

        var recordVideo = document.getElementById('record-video');
        var preview = document.getElementById('preview');

        var container = document.getElementById('container');

        // if you want to record only audio on chrome
        // then simply set "isFirefox=true"
        var isFirefox = !!navigator.mozGetUserMedia;

    if(!isFirefox){
        var recordAudio, recordVideo;
        record.onclick = function() {
         
        
        record.disabled = true;
            
            navigator.getUserMedia({
                audio: true,
                video: true
            }, function(stream) {
                preview.src = window.URL.createObjectURL(stream);
                preview.play();

                // var legalBufferValues = [256, 512, 1024, 2048, 4096, 8192, 16384];
                // sample-rates in at least the range 22050 to 96000.
                recordAudio = RecordRTC(stream, {
                    //bufferSize: 16384,
                    //sampleRate: 45000,
                    onAudioProcessStarted: function() {
                        if (!isFirefox) {
                            recordVideo.startRecording();
                        }
                    }
                });

                if (!isFirefox) {
                    recordVideo = RecordRTC(stream, {
                        type: 'video'
                    });
                    recordAudio.startRecording();
                }
                   
                stop.disabled = false;
            }, function(error) {
                alert(JSON.stringify(error, null, '\t'));
            });
            
          
        };
    }
   else{
       
        record.onclick = function() {
            record.disabled = true;

             captureUserMedia(function(stream) {
                recordVideo = RecordRTC(stream, {
                    type: 'video' // don't forget this; otherwise you'll get video/webm instead of audio/ogg
                });
                recordVideo.startRecording();
            });
        };

    }
   
     if(!isFirefox){
        var fileName;
        stop.onclick = function() {
            record.disabled = false;
            stop.disabled = true;

            preview.src = '';

            fileName = Math.round(Math.random() * 99999999) + 99999999;


               recordAudio.stopRecording(function() {
                   PostBlob(recordAudio.getBlob(), 'audio', fileName + '.wav');
                });
           
                recordVideo.stopRecording(function() {
                    PostBlob(recordVideo.getBlob(), 'video', fileName + '.webm');
                });
            
            deleteFiles.disabled = false;
        };
    }
    else{
        var fileName;
        stop.onclick = function() {
            record.disabled = false;
            stop.disabled = true;

            preview.src = '';

            fileName = Math.round(Math.random() * 99999999) + 99999999;

            
                recordVideo.stopRecording(function(url) {
                  // preview.src = url;
                  PostBlob(recordVideo.getBlob(), 'video', fileName + '.webm');
                });
          
            deleteFiles.disabled = false;
        };
    }

        deleteFiles.onclick = function() {
            deleteAudioVideoFiles();
        };

        function deleteAudioVideoFiles() {
            deleteFiles.disabled = true;
            if (!fileName) return;
            var formData = new FormData();
            formData.append('delete-file', fileName);
            xhr('delete.php', formData, null, null, function(response) {
                console.log(response);
            });
            fileName = null;
            container.innerHTML = '';
        }

        function xhr(url, data, progress, percentage, callback) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    callback(request.responseText);
                }
            };

            if (url.indexOf('delete.php') == -1) {
                request.upload.onloadstart = function() {
                    percentage.innerHTML = 'Upload started...';
                };

                request.upload.onprogress = function(event) {
                    progress.max = event.total;
                    progress.value = event.loaded;
                    percentage.innerHTML = 'Upload Progress ' + Math.round(event.loaded / event.total * 100) + "%";
                };

                request.upload.onload = function() {
                    percentage.innerHTML = 'Saved!';
                };
            }

            request.open('POST', url);
            request.send(data);
        }

   //     window.onbeforeunload = function() {
  //          if (!!fileName) {
  //              deleteAudioVideoFiles();
  //              return 'It seems that you\'ve not deleted audio/video files from the server.';
  //          }
  //      };
        
        
        
        function captureUserMedia(callback) {
            navigator.getUserMedia = navigator.mozGetUserMedia;
            navigator.getUserMedia({
                audio: true,
                video: true
            }, function(stream) {
                preview.src = URL.createObjectURL(stream);
                preview.muted = false;
                preview.controls = true;
                preview.play();

                callback(stream);
                stop.disabled = false;
            }, function(error) {
                console.error(error);
            });
        }