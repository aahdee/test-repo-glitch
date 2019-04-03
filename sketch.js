let charRNN;
let orig;
let option1;
let option2;
let option3;
let button;
let runningInference = false;

function preload()
{
  charRNN = ml5.charRNN('./models/info/', modelReady);
}

function setup()
{
  noCanvas();
  // Create the LSTM Generator passing it the model directory



  orig = select('#textInput')
  option1 = select('#option1');
  option2 = select('#option2');
  option3 = select('#option3');
  button = select('#generate');

  button.mousePressed(generate);

}

function modelReady() {
  select('#status').html('Model Loaded');
}

function generate() {
  // prevent starting inference if we've already started another instance
  // TODO: is there better JS way of doing this?
 if(!runningInference) {
    runningInference = true;

    // Update the status log
    select('#status').html('Generating...');

    // Grab the original text
    let original = orig.value();
    // Make it to lower case
    let txt = original.toLowerCase();

    // Check if there's something to send
    if (txt.length > 0) {
      // This is what the LSTM generator needs
      // Seed text, temperature, length to outputs
      // TODO: What are the defaults?
      let data = {
        seed: txt,
        temperature: 0.5,
        length: 20
      };

      // Generate text with the charRNN
      charRNN.generate(data, gotData1);
      charRNN.generate(data, gotData2);
      charRNN.generate(data, gotData3);
      // When it's done
      function gotData1(err, result) {
        // Update the status log
        select('#status').html('Ready!');
        select('#option1').html(txt + option1.sample);
        runningInference = false;
      }
      function gotData2(err, result) {
        // Update the status log
        select('#status').html('Ready!');
        select('#option2').html(txt + option2.sample);
        runningInference = false;
      }
      function gotData3(err, result) {
        // Update the status log
        select('#status').html('Ready!');
        select('#option3').html(txt + option3.sample);
        runningInference = false;
      }
    }
  }
}
