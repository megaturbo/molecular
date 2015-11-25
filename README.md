# molecular
Molecule viewer in WebGL 3D

## Introduction

Molecular aura pour but d’offrir aux gens une visualisation d’une molécule donnée, l’application permettra à l’utilisateur de se représenter ces toutes petites entités à une échelle agréable pour l’oeil humain. De plus, la vue étant 3D, l’utilisateur n’aura pas qu’une simple image fixe devant lui, mais un environnement tridimensionnel. Il pourra donc visualiser la molécule désirée sous n’importe quel angle.

The project use actually a SpaceFill visualisation.
https://en.wikipedia.org/wiki/Space-filling_model


## Primary

- Une vue 3D composée d’une molécule, manipulable à l’aide la souris et du clavier ;
- Une dizaine de molécules stockées avec leur géométrie en « dur ». Toutes à disposition de l’utilisateur ;
- Afficher le nom des différents atomes.

## Secondary
- Approche des séries : carbone, méthane, éthane, propane, butane, etc… Afin de suivre un cycle de structure « simple » à construire ;
- Editeur de molécule, où l’on propose à l’utilisateur une palette d’outil permettant de donner ses propres molécules.

## Constraints
- Langage :
- HTML / CSS : Mise en page ;
 - JS / GLSL (WebGL) : Logique et 3D.
 - Aucune librairie axée WebGL (e. g. three.js).
