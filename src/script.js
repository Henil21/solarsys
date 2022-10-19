import "./style.css"
// const { Color } = require("three")
import * as THREE from "three"
import { Mesh } from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'
// import { HotUpdateChunk } from "webpack"
const textureloader= new THREE.TextureLoader()
const texture=textureloader.load('textures/door/8k_earth_daymap.jpg')
const text=textureloader.load('textures/door/2k_mars.jpg')
const suntexture =textureloader.load('textures/door/Sun Texture Seamless.png')
const mer=textureloader.load('textures/door/2k_mercury.jpg')
const ven=textureloader.load('textures/door/2k_venus_surface.jpg')
const jup=textureloader.load('textures/door/2k_jupiter.jpg')
const sat=textureloader.load('textures/door/2k_saturn.jpg')
const rt=textureloader.load('textures/door/2k_saturn_ring_alpha.png')
const urn=textureloader.load('textures/door/2k_uranus.jpg')
const  npt=textureloader.load('textures/door/2k_neptune.jpg')









// Debug UI

const gui = new dat.GUI();
const parameters={
  color:0xff0000,
  spin:()=>
  {
    gsap.to(mesh.rotation,{duration:1 ,y:mesh.rotation.y+Math.PI*2})
  }
}
// gui.addColor(parameters,'color')
gui.add(parameters,'spin')


const canvas=document.querySelector('canvas.webgl')
// console.log(dat)

// cursor 
const coursor={
    x: 0,
    y: 0
}

window.addEventListener('mousemove',(event)=>{
    coursor.x=event.clientX/size.width-0.5//-0.5 because its going till 1 from 0 by -0.5 we divide it like -0.5  0   0.5
    coursor.y= -(event.clientY/size.height-0.5)    
    // console.log(coursor.x)
    // // console.log(coursor.y)

})


const scene = new THREE.Scene()
// const group = new THREE.Group()
// scene.add(group)
const group = new THREE.Group();

  // wireframe:true, //details of object (material)
const sun=new THREE.Mesh(
  new THREE.SphereBufferGeometry(2,64,64),
  new THREE.MeshBasicMaterial({
    map:suntexture
  })
)
group.add(sun)

const mercury=new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.1,10,10),
  new THREE.MeshStandardMaterial({
    map:mer
  })
)
group.add(mercury)
mercury.position.x=2.3

const venus=new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3,15,15),
  new THREE.MeshStandardMaterial({
    map:ven
  })
)
group.add(venus)
venus.position.x=-2

const earth = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3,32,32) , // creating  geometry of object
  new THREE.MeshStandardMaterial({ 
  map:texture
})
   ) //combining geometry and material, as one
earth.position.x=-4
group.add(earth) 

//mars
const geo = new THREE.SphereBufferGeometry(0.2,32,32)  // creating  geometry of object

const mat= new THREE.MeshStandardMaterial({
   map :text,
  // wireframe:true,
}
   ) //details of object (material)
const mars =new THREE.Mesh(geo,mat) //combining geometry and material as one
group.add(mars) 
mars.position.x=3.5
scene.add(group)

const jupiter = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5,32,32) , // creating  geometry of object
  new THREE.MeshStandardMaterial({ 
  map:jup
})
   ) //combining geometry and material, as one
earth.position.x=-4
group.add(jupiter)

const saturn = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5,32,32) , // creating  geometry of object
  new THREE.MeshStandardMaterial({ 
  map:sat
})
   ) //combining geometry and material, as one
// earth.position.x=-5.5
group.add(saturn)

const geometry = new THREE.RingGeometry( 0.5, 1, 32 );
const material = new THREE.MeshBasicMaterial( {map:rt } );
const ring = new THREE.Mesh( geometry, material );
group.add( ring );
ring.rotation.x= -Math.PI*0.5
ring.position.y=-0

const uranus = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3,32,32) , // creating  geometry of object
  new THREE.MeshStandardMaterial({ 
  map:urn
})
   ) 
group.add(uranus)

const neptune = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.35,32,32) , // creating  geometry of object
  new THREE.MeshStandardMaterial({ 
  map:npt
})
   ) 
group.add(neptune)

const alight= new THREE.AmbientLight(0xffffff,0.5)
scene.add(alight)
gui.add(alight,'intensity').min(0).max(1).step(0.1)

const dlight=new THREE.DirectionalLight('ffff00',0.5)
scene.add(dlight)
dlight.position.set(1,0.25,0)
gui.add(dlight,'intensity').min(0).max(1).step(0.1).name('Dlight')


const size={
    width:window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('resize',()=>{
    size.width = window.innerWidth,
    size.height = window.innerHeight
    camera.aspect=size.width/size.height
    camera.updateProjectionMatrix()
   // updating renderer
    renderer.setSize(size.width,size.height)

})
//double click to go full screen
window.addEventListener('dblclick',()=>{
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  }
  else{
    document.exitFullscreen()
  }
})



const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
// const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,100)

scene.add(camera)
camera.position.z=10
camera.position.y=15
// camera.position.z=5

//controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true


const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(size.width,size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))//will render between devicepixel and 2
renderer.render(scene,camera)

// let time= Date.now()
//clock
const clock=new THREE.Clock()

const  tick= () =>
{
    const elap=clock.getElapsedTime()

    sun.rotation.y=elap
    
    mercury.position.x=Math.cos(elap/0.5)*2.5
    mercury.position.z=Math.sin(elap/0.5)*2.5

    mercury.rotation.x=0.3
    mercury.rotation.y=elap/Math.PI*2

    venus.position.x=Math.cos(elap*1.5)*3.9
    venus.position.z=Math.sin(elap*1.5)*3.9

    venus.rotation.x=0.3
    venus.rotation.y=elap/Math.PI*2
    


    earth.position.x=Math.cos(elap)*4.9
    earth.position.z=Math.sin(elap)*4.9

    earth.rotation.x=0.3
    earth.rotation.y=elap/Math.PI*2

    mars.rotation.x=0.3
    mars.position.x=Math.cos(elap*0.7)*5.8
    mars.position.z=Math.sin(elap*0.7)*5.8

    jupiter.rotation.y=elap
    jupiter.position.x=Math.cos(elap*0.5)*6.8
    jupiter.position.z=Math.sin(elap*0.5)*6.8

    
    saturn.rotation.y=elap
    saturn.position.x=Math.cos(elap*0.45)*7.95
    saturn.position.z=Math.sin(elap*0.45)*7.95

    ring.rotation.z=elap
    ring.position.x=Math.cos(elap*0.45)*7.95
    ring.position.z=Math.sin(elap*0.45)*7.95


    uranus.rotation.y=elap
    uranus.position.x=Math.cos(elap*0.35)*9
    uranus.position.z=Math.sin(elap*0.35)*9

    neptune.rotation.y=elap
    neptune.position.x=Math.cos(elap*0.45)*9.7
    neptune.position.z=Math.sin(elap*0.45)*9.7

    renderer.render(scene,camera)



    window.requestAnimationFrame(tick)//call function at each point
}
tick()
