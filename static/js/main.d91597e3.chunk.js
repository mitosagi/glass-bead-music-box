(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{700:function(e,t,n){e.exports=n(717)},705:function(e,t,n){},706:function(e,t,n){},717:function(e,t,n){"use strict";n.r(t);var a=n(26),r=n.n(a),o=n(538),i=n.n(o),c=(n(705),n(2)),s=n(3),l=n(4),u=n(5),d=(n(706),n(39)),m=n.n(d),h=n(688),f=n(64);var p=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).tick=function(){var e=["D","G","Em","A","D","G","Em","A","Bm","A","G","D","Em","A","D","D","D","G","A","Em7","D","G","A","Em7"],t=h.a.chord(e[a.state.pos]).notes;console.log(a.state.pos+1+" "+e[a.state.pos]),a.setState({chord:["3","4","5"].map((function(e){return t.map((function(t){return t+e}))})),pos:a.state.pos+1<e.length?a.state.pos+1:0})},a.state={chord:["C3","C4","C5"],pos:0},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=m.a.Engine,n=m.a.Render,a=m.a.World,r=m.a.Bodies,o=m.a.Mouse,i=m.a.MouseConstraint,c=t.create({positionIterations:20});c.world.gravity.y=0;var s=n.create({element:this.refs.scene,engine:c,options:{width:600,height:600,wireframes:!0}}),l={isStatic:!0,restitution:1,friction:0,frictionAir:0,frictionStatic:0,inertia:1/0,label:""};a.add(c.world,[r.rectangle(300,-100,800,200,l),r.rectangle(300,700,800,200,l),r.rectangle(700,300,200,600,l),r.rectangle(-100,300,200,600,l)]),l.isStatic=!1,l.label="ball";var u=r.circle(100,100,50,l),d=r.circle(200,200,60,l),h=r.circle(320,320,70,l),p=r.circle(450,450,80,l);a.add(c.world,[u,d,h,p]);var v=o.create(s.canvas),b=i.create(c,{mouse:v,constraint:{stiffness:.2,render:{visible:!1}}});a.add(c.world,b);var g=new f.b({C4:"vibraphone.mp3"},{baseUrl:"./"}).chain(new f.c(-20),f.a);this.tick(),setInterval((function(){return e.tick()}),140/60*1e3),m.a.Events.on(c,"collisionStart",(function(t){for(var n=t.pairs,a=0;a<1;a++){var r=n[a];r.bodyA.label.includes("ball")&&r.bodyB.label.includes("ball")&&e.state.chord[Math.floor(Math.random()*e.state.chord.length)].forEach((function(e){g.triggerAttackRelease(e,"1n")}))}})),t.run(c),n.run(s)}},{key:"render",value:function(){return r.a.createElement("div",{ref:"scene"})}}]),n}(r.a.Component),v=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"glass-bead-music-box"),r.a.createElement(p,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[700,1,2]]]);
//# sourceMappingURL=main.d91597e3.chunk.js.map