import React from 'react';
import './App.css';
import Matter from "matter-js";
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

interface ISceneState {
  chord: string[][];
  pos: number;
}

class Scene extends React.Component<Object, ISceneState>  {
  private sceneRef: React.RefObject<HTMLDivElement>;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { chord: [["C3", "C4", "C5"]], pos: 0 };
    this.sceneRef = React.createRef();
  }

  componentDidMount() {
    if (this.sceneRef.current === null) throw new Error("sceneRef.current === null");

    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create({
      positionIterations: 20
    });

    engine.world.gravity.y = 0;

    const render = Render.create({
      element: this.sceneRef.current,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: true
      }
    });

    const set: Matter.IChamferableBodyDefinition = {
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

    const ballSet = Object.assign({}, set)
    ballSet.isStatic = false
    ballSet.label = "ball"

    //add balls
    World.add(engine.world, [
      Bodies.circle(100, 100, 50, ballSet),
      Bodies.circle(200, 200, 60, ballSet),
      Bodies.circle(320, 320, 70, ballSet),
      Bodies.circle(450, 450, 80, ballSet)
    ]);

    // add mouse control
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        } as Matter.Constraint
      });

    World.add(engine.world, mouseConstraint)

    //add collision sound
    const synth =
      new Tone.Sampler({
        C4: "vibraphone.mp3"
      }, {
        baseUrl: "./"
      }).chain(new Tone.Volume(-20), Tone.Destination)

    Matter.Events.on(engine, 'collisionStart', (event) => {
      if (event.pairs.find(pair => pair.bodyA.label.includes("ball") && pair.bodyB.label.includes("ball")) !== undefined)
        this.state.chord[Math.floor(Math.random() * this.state.chord.length)]
          .map(note => synth.triggerAttackRelease(note, "1n"))
    })

    Engine.run(engine)
    Render.run(render)

    this.tick()
    setInterval(
      () => this.tick(),
      70 * 2 / 60 * 1000
    );
  }

  tick = () => {
    //const chords = [
    // "D", "G", "Em", "A",
    // "D", "G", "Em", "A",
    // "Bm", "A", "G", "D",
    // "Em", "A", "D", "D",
    // "D", "G", "A", "Em7",
    // "D", "G", "A", "Em7",]
    const chords = ["Am", "Em", "F", "C", "C", "G", "F", "C"]
    const notes = Chord.chord(chords[this.state.pos]).notes
    const number = ["3", "4", "5"]

    this.setState({
      chord: number.map(num => notes.map(note => note + num)),
      pos: (this.state.pos + 1 < chords.length) ? this.state.pos + 1 : 0
    });
  }

  render() {
    return <div ref={this.sceneRef} />;
  }
}

export default App;
