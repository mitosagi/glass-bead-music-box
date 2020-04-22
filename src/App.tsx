import React from 'react';
import './App.css';
import Matter from "matter-js";
//eslint-disable-next-line
import { Chord } from '@tonaljs/tonal';
import * as Tone from 'tone';

function App() {
  return (
    <div className="App">
      <h1>glass-bead-music-box</h1>
      <Scene></Scene>
    </div>
  );
}

class Scene extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { chord: ["C3", "C4", "C5"], pos: 0 };
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({
      positionIterations: 20
    });

    engine.world.gravity.y = 0;

    var render = Render.create({
      // @ts-ignore
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: true
      }
    });

    var set = {
      isStatic: true,
      restitution: 1,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      inertia: Infinity,
      label: ''
    };

    //add walls
    World.add(engine.world, [
      Bodies.rectangle(300, -100, 800, 200, set),
      Bodies.rectangle(300, 700, 800, 200, set),
      Bodies.rectangle(700, 300, 200, 600, set),
      Bodies.rectangle(-100, 300, 200, 600, set)
    ]);

    set.isStatic = false
    set.label = "ball"

    //add balls
    var ballA = Bodies.circle(100, 100, 50, set);
    var ballB = Bodies.circle(200, 200, 60, set);
    var ballC = Bodies.circle(320, 320, 70, set);
    var ballD = Bodies.circle(450, 450, 80, set);
    World.add(engine.world, [ballA, ballB, ballC, ballD]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        // @ts-ignore
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);
    //add collision sound
    const synth =
      // new Synth().toMaster()
      new Tone.Sampler({
        C4: "vibraphone.mp3"
      }, {
        // @ts-ignore
        baseUrl: "./"
      }).chain(new Tone.Volume(-16), Tone.Destination)
    this.tick()
    setInterval(
      () => this.tick(),
      70 * 2 / 60 * 1000
    );

    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;
      //for (var i = 0; i < pairs.length; i++) {
      for (var i = 0; i < 1; i++) {
        var pair = pairs[i];
        if (pair.bodyA.label.includes("ball") && pair.bodyB.label.includes("ball")) {
          // @ts-ignore
          this.state.chord[Math.floor(Math.random() * this.state.chord.length)].forEach((c: any) => {
            synth.triggerAttackRelease(c, "1n")
          })
        }
      }
    });

    Engine.run(engine)
    Render.run(render)
  }

  tick = () => {
    const chords = [
      "D", "G", "Em", "A",
      "D", "G", "Em", "A",
      "Bm", "A", "G", "D",
      "Em", "A", "D", "D",
      "D", "G", "A", "Em7",
      "D", "G", "A", "Em7",]
    //const chords = ["Am", "Em", "F", "C", "C", "G", "F", "C"]
    // @ts-ignore
    const notes = Chord.chord(chords[this.state.pos]).notes
    const number = ["3", "4", "5"]
    // @ts-ignore
    console.log((this.state.pos + 1) + " " + chords[this.state.pos])
    this.setState({
      chord: number.map(num => notes.map(note => note + num)),
      // @ts-ignore
      pos: (this.state.pos + 1 < chords.length) ? this.state.pos + 1 : 0
    });
  }

  render() {
    return <div ref="scene" />;
  }
}

export default App;
