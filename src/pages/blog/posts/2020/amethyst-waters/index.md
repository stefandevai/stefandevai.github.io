---
title: "Lisp hacking on confinement nights: Amethyst Waters"
date: "2020-04-25"
language: "en"
featuredImage: "./gameplay.png"
featuredImageCaption: "Amethyst Waters gameplay."
tags: ["gamedev", "programming", "lisp"]
---

*The user [ergodicbreak](https://ergodicbreak.itch.io/) on itch.io created a post-mortem post about the jam and about his game which inspired me to create this one. He mentioned my game as his favorite in the jam and I'm very honored for that! :) Make sure to read [his post](https://ergodicbreak.itch.io/xenoamob/devlog/140174/post-jammin) about the jam.*

Almost one month of confinement due to the COVID-19 had passed when I decided to take part in the [Spring Lisp Game Jam](https://itch.io/jam/spring-lisp-game-jam-2020). From April 10th to April 20th I created an entire game and then submitted it to be voted. I was happy and surprised to win the first place! You can play **Amethyst Waters** in the browser [here](https://stefandevai.itch.io/amethyst-waters), take a look to the code on [GitHub](https://github.com/stefandevai/amethyst-waters), and play the other games in the jam [here](https://itch.io/jam/spring-lisp-game-jam-2020/entries). This was the first time I committed to finish a game using a game engine instead of creating one of my own. In this post I want to discuss the process of developing Amethyst Waters what went well, and what can be improved for my next game jams.

## Plan

I have a *pretty good* historic on having game ideas with a giant scope and not being able to finish them. I wasn't concerned about innovative mechanics, my sole objective this time was to be able to finish a game. So the following ideas came to my mind:

- **A shoot 'em up:** it's a genre with somewhat simple mechanics that can easily scale in terms of content; that is, I can implement a basic gun type and then, if I still have time in the end of the jam, add different gun types with various effects.
- **Ecco Tides of Time:** I love this game so much, and even more its beautiful [soundtrack](https://www.youtube.com/watch?v=32S2oJuANxo). Normally I wouldn't like to make a game about killing sea creatures, but as I didn't have a lot of time to think about design solutions for this issue, I decided to create abstract sea creatures that don't really exist.
- **Old demos:** the demoscene was the graffiti scene on early computers. Its rebellious nature always associated with an underground hacking scene created an art expression that is unique and inspiring for these days. TIC-80 limitations made me think about the demoscene and as I listened to the [Future Crew](https://www.youtube.com/watch?v=KTjnt_WSJu8) or [Triton](https://www.youtube.com/watch?v=LNXERInw69g), I thought it would be a good addition to the game mood.

As I wasn't innovating with the mechanics or story, as I was doing the game alone and as I already had the whole idea in my head I passed to the development phase without to much formal planning. Otherwise I'm sure it would be a better idea to plan things out.

## Environment

Didn't lost any time thinking about an idea, that's a good start! Now it was time to decide on which technology I would use to build the game. I searched if there was any way of using Common Lisp to create a browser game. Maybe there's one, but I couldn't find any. I then found out about TIC-80, a fantasy console, and its support of the Fennel programming language, a Lisp dialect. I did some tests before the jam, but I admit it is kind of weird when coming from Common Lisp. I usually go with Emacs when hacking with Common Lisp, but as I couldn't find any comfortable way to integrate Slime and TIC-80 and as I would have to constantly minify the code later on (in order to fit the 64k size limitation), I decided to stick with NeoVim.

So [TIC-80](https://tic.computer/) is a fantasy console — a kind of emulator for a game console that never existed —, and I found it to be a perfect minimalist engine which limitations include 64k file size for the code, 4 audio channels and a 16 color palette. As it happened in the old consoles era, limitations can magically boost your creativity in order to overcome them. As we all know, *less is more*.

It was strange to be immersed on a text editor during 10 days while it was bright and sunny outside; but in the middle of a pandemic the streets had a creepy empty look. The lack of other things to do really helped in the motivation to code during hours a day.

## Timeline

TIC-80 provides a nice feature for easily recording animated GIFs of the game. So I just went through my commits on the game code and selected 19 states of development so you can have a sense on the evolution of the game.

### Basic movement:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p1.mp4" type="video/mp4" />
</video>

The first thing for most games. I just wanted to be able to control the main object in the game. As the camera movement will be automatic, I also added a basic screen boundaries collision, that is so the player can't go out of the screen.

### Start screen and shots:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p2.mp4" type="video/mp4" />
</video>

Next basic element of a shoot 'em up are the actual shots. These are simply stored in an array in the player object. I didn't felt the need of implementing any kind of complex Entity-Component-System for this simple game.

### Enemies, collisions and damage:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p3.mp4" type="video/mp4" />
</video>

Here I added a basic enemy pool for spawning and removing enemies from the game when hit by a gun shot or get out of the screen to the left.

### Sprite animation:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p4.mp4" type="video/mp4" />
</video>

This part actually took some time to get right as for some reason I decided to implement a time based animation instead of using game frames as its base.

### Camera movement:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p5.mp4" type="video/mp4" />
</video>

I added some placeholder sprites and a camera movement to the game in order to begin having the feeling of a sidescroller.

### Fish movement:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p6.mp4" type="video/mp4" />
</video>

Now the fish have a more floaty movement just by simply using the sine trigonometric function to determine its y-axis position.

### Cave generation:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p7.mp4" type="video/mp4" />
</video>

Now we start getting into the actual complex part of the game: the cave generation system. First we generate the bottom wall height and then the upper wall will be just a mask of the bottom part. I naively thought that this would easily prevent situations where the forward path is blocked. I was wrong and even worse than that, this algorithm created pretty boring caves. I would change it later on.

### Procedural generation:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p8.mp4" type="video/mp4" />
</video>

Here I just added a Perlin Noise generation function to the same algorithm and tested it with sidescrolling.

### Collision resolution:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p9.mp4" type="video/mp4" />
</video>

It's like the 6th time I implement 2D collision resolution from scratch and I usually get stuck in the corner cases. This time it wasn't different. I used a whole day to implement this and about one hour of the next day to fix bugs.

### Infinite scrolling and parallax effect:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p10.mp4" type="video/mp4" />
</video>

At this point I start to get relieved as the main components for the game seem to be getting done. Infinite scrolling and generation works flawlessly and I also added a parallax effect to the background.

### New color palette:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p11.mp4" type="video/mp4" />
</video>

Confident that I was advancing with the game, I thought it was time to depart from the default TIC-80's color palette. I experimented a lot on Aseprite and came up with this palette. I wanted something that was not realist, but dark, mysterious and vibrant at the same time.

### Collectables and HUD:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p12.mp4" type="video/mp4" />
</video>

Inspired by the new palette, I came up with the name Amethyst Waters for the game, which actually became its official name. I then added amethysts as collectables and also implemented a basic HUD with a score and a healthbar. 

The healthbar is very simple. I draw the UI sprites in the background and then draw pixel lines in health color over it. The width of this lines is proportional to the players health.

```lisp
(fn draw-healthbar [x y amount]
  "Draws a healthbar in (x, y) with a certain amount of health."
  ;; Top UI sprites
  (spr 384 (+ x 3) y 0 1 0 0 2 1)
  (for [i 2 5 1]
    (spr 385 (+ x (* 8 i) 3) y 0 1 0 0 1 1))
  (spr 385 (+ x 42 3) y 0 1 0 0 2 1)

  ;; Bottom UI sprites (same as top sprites, but flipped vertically)
  (spr 384 (+ x 3) (+ y 5) 0 1 2 0 2 1)
  (for [i 2 5 1]
    (spr 385 (+ x (* 8 i) 3) (+ y 5) 0 1 2 0 1 1))
  (spr 385 (+ x 42 3) (+ y 5) 0 1 2 0 2 1)

  ;; Draw pixel lines proportional to the player's health
  (var fill-color 1)
  (for [j y (+ y 4) 1]
    (for [i (+ x 3) (+ x 3 amount -1) 1]
      (pix (+ i 4) (+ j 4) fill-color))))
```

### Icosahedron:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p13.mp4" type="video/mp4" />
</video>

This is probably the most useless but cool feature I added to the game. I used a whole day to implement it with only triangles. It was adapted from [this article](http://www.songho.ca/opengl/gl_sphere.html) of drawing a sphere with C++ and OpenGL.

The basic idea is to get the vertices using the algorithm described in the article, then drawing triangles using these vertices and draw them according to its z-order. Finally we implement basic rotation operations using matrices and voilà.

### Particles:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p14.mp4" type="video/mp4" />
</video>

Now we started the polishing phase. A generic particle system was added in order to easily implement different particles. The bubble particle in the back of the submarine just emits single pixels. This small touch helps a lot in improving the underwater theme.

### Different weapons and new colors:

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p15.mp4" type="video/mp4" />
</video>

I created three weapon types, adjusted the palette color, added a background bubble particle emitter and added some new sprites.

### Anglerfish boss

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p16.mp4" type="video/mp4" />
</video>

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p17.mp4" type="video/mp4" />
</video>

I also added a final boss, an monstrous anglerfish that has three different attacks, a lot of health and constantly tries to follow the player.

### More enemies

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p18.mp4" type="video/mp4" />
</video>

This was definitely the most boring part of the whole development. I spent an entire day adjusting enemy waves, how much damage they dealt and which of those were allowed to appear together. It was an endless loop of testing and testing multiple times the same parts in order to see if we have a good transition between enemy waves while having a overall good difficulty progression.

### Final touches

<video playsinline muted autoplay loop>
  <source src="../../../../../../blog-assets/2020/amethyst-waters/videos/p19.mp4" type="video/mp4" />
</video>

In the last hours before submission I added a endscreen after the boss, added new particles, tested with friends, improved upon their feedback and added some algae background that my girlfriend made while learning pixel art. It still shipped with some bugs related to triangle rendering, collision and enemy spawning. However, the reception by the other people in the jam was good, so I was very satisfied with the final results.

## Successes

- The choice of using TIC-80 was the best possible. Its simplicity and constraints work well against the impulse of augmenting the scope of the game.
- Procedurally generating the levels allowed me to spend a lot less time and energy with level design. It wouldn't work with any game concept, though.
- Prioritizing features to be added in the game worked as planned. I was able to finish the main mechanics very early and then concentrate in adding content during the last days of the jam.

## Failures

- Lack of more initial planning led to adding some small features that were later removed, like other enemies, a fourth weapon and a more physical accurate movement.
- Trying to compose directly on TIC-80 made me lost about 8 hours of work. The problem is that I was using the most current build, therefore it's not necessarily stable, and the tracker on linux starts to have weird delays with time. As it was hard to keep listening what I was composing, I ended up with a tune I thought was good enough and then went to bed. Next day I listened to it and it was very very bad. I threw it away and started all over again on [MilkyTracker](https://milkytracker.titandemo.org/).
- This is not necessarily a failure, but the game wasn't very innovative. As stated, my objective was only to finish a game, but if I want to improve, I will need to try out new mechanic ideas next time.

## Conclusion

Developing a game with TIC-80 for a game jam gave me a small glimpse of what once was the demoscene. The healthy competition and the "hardware" limitations were an awesome experience to pass the time during this endless confinement.

The jam as a whole was super fun and I was able to meet a lot of talented lisp game developers in the way. Make sure to play [all the other games](https://itch.io/jam/spring-lisp-game-jam-2020/entries) submitted to the jam.

