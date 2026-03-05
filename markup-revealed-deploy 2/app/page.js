"use client";
import { useState, useMemo } from "react";

// ─── SVG ILLUSTRATION FACTORY ───
const I = {
  sunglasses: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><ellipse cx="140" cy="150" rx="50" ry="40" fill="none" stroke={c} strokeWidth="4"/><ellipse cx="260" cy="150" rx="50" ry="40" fill="none" stroke={c} strokeWidth="4"/><ellipse cx="140" cy="150" rx="42" ry="32" fill={c} opacity="0.08"/><ellipse cx="260" cy="150" rx="42" ry="32" fill={c} opacity="0.08"/><path d="M190 150 Q200 140 210 150" fill="none" stroke={c} strokeWidth="3"/><line x1="90" y1="140" x2="30" y2="125" stroke={c} strokeWidth="3" strokeLinecap="round"/><line x1="310" y1="140" x2="370" y2="125" stroke={c} strokeWidth="3" strokeLinecap="round"/></svg>,
  sneaker: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M60 200 Q60 160 100 150 L180 140 Q200 130 220 135 L300 145 Q340 150 350 170 L355 190 Q358 200 350 205 L60 205 Z" fill={c} opacity="0.12" stroke={c} strokeWidth="2.5"/><path d="M60 205 Q60 215 70 218 L340 218 Q355 218 355 208" fill="none" stroke={c} strokeWidth="3"/><circle cx="120" cy="175" r="4" fill={c} opacity="0.4"/><circle cx="140" cy="170" r="4" fill={c} opacity="0.4"/><circle cx="160" cy="167" r="4" fill={c} opacity="0.4"/></svg>,
  leggings: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M155 35 Q153 40 152 60 L145 180 Q140 250 138 260 Q137 268 145 270 L170 270 Q176 268 175 262 L180 190 Q185 175 190 175 Q195 175 200 190 L205 262 Q206 268 212 270 L237 270 Q243 268 242 260 L235 180 L228 60 Q227 40 225 35 Z" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/><line x1="155" y1="35" x2="225" y2="35" stroke={c} strokeWidth="3"/><path d="M230 50 Q228 60 226 120 L218 260 Q217 270 225 272 L250 272 Q256 270 254 262 L260 190 Q265 175 270 190 L276 262 Q277 270 283 272 L308 272 Q314 270 312 260 L304 120 Q302 60 300 50 Z" fill={c} opacity="0.08" stroke={c} strokeWidth="1.5"/><line x1="230" y1="50" x2="300" y2="50" stroke={c} strokeWidth="2"/></svg>,
  jacket: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M160 50 L130 70 L100 85 L90 105 L115 115 L130 95 L135 240 Q135 248 143 250 L257 250 Q265 248 265 240 L270 95 L285 115 L310 105 L300 85 L270 70 L245 55" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><path d="M160 50 Q180 45 200 43 Q220 45 245 55" fill="none" stroke={c} strokeWidth="2.5"/><line x1="200" y1="55" x2="200" y2="240" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"/></svg>,
  bag: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="130" y="100" width="140" height="150" rx="8" fill={c} opacity="0.1" stroke={c} strokeWidth="2.5"/><path d="M165 100 Q165 60 200 55 Q235 60 235 100" fill="none" stroke={c} strokeWidth="2.5"/><rect x="185" y="160" width="30" height="20" rx="3" fill="none" stroke={c} strokeWidth="2" opacity="0.5"/></svg>,
  belt: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="40" y="135" width="320" height="30" rx="4" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><rect x="170" y="125" width="60" height="50" rx="6" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="200" cy="150" r="4" fill={c} opacity="0.4"/></svg>,
  shirt: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M155 55 L130 70 L100 85 L90 105 L115 115 L130 95 L135 240 Q135 248 143 250 L257 250 Q265 248 265 240 L270 95 L285 115 L310 105 L300 85 L270 70 L245 55" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><path d="M155 55 Q175 48 200 45 Q225 48 245 55" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="193" cy="80" r="3" fill={c} opacity="0.4"/><circle cx="193" cy="100" r="3" fill={c} opacity="0.4"/></svg>,
  jogger: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M155 35 Q153 40 152 60 L145 180 Q140 250 138 260 Q137 268 145 270 L170 270 Q176 268 175 262 L180 190 Q185 175 190 175 Q195 175 200 190 L205 262 Q206 268 212 270 L237 270 Q243 268 242 260 L235 180 L228 60 Q227 40 225 35 Z" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/><line x1="155" y1="35" x2="225" y2="35" stroke={c} strokeWidth="3"/></svg>,
  shorts: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M140 80 L138 90 Q135 110 133 140 L125 200 Q124 210 132 212 L175 212 Q180 210 178 200 L185 160 Q190 150 195 150 Q200 150 205 160 L212 200 Q213 210 218 212 L260 212 Q268 210 267 200 L258 140 Q256 110 253 90 L250 80 Z" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/><line x1="140" y1="80" x2="250" y2="80" stroke={c} strokeWidth="3"/></svg>,
  earbuds: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="160" y="100" width="80" height="110" rx="14" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><circle cx="180" cy="140" r="12" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/><circle cx="220" cy="140" r="12" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/><line x1="180" y1="152" x2="180" y2="175" stroke={c} strokeWidth="4" strokeLinecap="round" opacity="0.2"/><line x1="220" y1="152" x2="220" y2="175" stroke={c} strokeWidth="4" strokeLinecap="round" opacity="0.2"/></svg>,
  headphones: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M140 170 Q140 100 200 80 Q260 100 260 170" fill="none" stroke={c} strokeWidth="4"/><rect x="120" y="160" width="30" height="50" rx="8" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/><rect x="250" y="160" width="30" height="50" rx="8" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/></svg>,
  cable: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="80" y="140" width="40" height="20" rx="3" fill={c} opacity="0.2" stroke={c} strokeWidth="2"/><rect x="280" y="140" width="40" height="20" rx="3" fill={c} opacity="0.2" stroke={c} strokeWidth="2"/><path d="M120 150 Q200 120 200 150 Q200 180 280 150" fill="none" stroke={c} strokeWidth="3" opacity="0.5"/></svg>,
  cartridge: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="150" y="80" width="100" height="140" rx="6" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="160" y="90" width="80" height="30" rx="3" fill={c} opacity="0.15"/><rect x="170" y="130" width="60" height="8" rx="2" fill={c} opacity="0.12"/><rect x="170" y="145" width="60" height="8" rx="2" fill={c} opacity="0.12"/></svg>,
  phoneCase: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="150" y="50" width="100" height="200" rx="14" fill={c} opacity="0.08" stroke={c} strokeWidth="2.5"/><rect x="160" y="65" width="80" height="155" rx="6" fill={c} opacity="0.04"/><circle cx="200" cy="238" r="6" fill="none" stroke={c} strokeWidth="1.5" opacity="0.3"/></svg>,
  charger: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><circle cx="200" cy="150" r="50" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><circle cx="200" cy="150" r="35" fill={c} opacity="0.04" stroke={c} strokeWidth="1" strokeDasharray="4 3"/><path d="M195 135 L205 135 L202 150 L210 150 L195 170 L198 155 L190 155 Z" fill={c} opacity="0.4"/></svg>,
  speaker: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="130" y="100" width="140" height="100" rx="40" fill={c} opacity="0.08" stroke={c} strokeWidth="2.5"/><circle cx="200" cy="150" r="25" fill="none" stroke={c} strokeWidth="2" opacity="0.3"/><circle cx="200" cy="150" r="12" fill={c} opacity="0.12"/></svg>,
  cream: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="150" y="110" width="100" height="80" rx="10" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="145" y="100" width="110" height="18" rx="5" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/></svg>,
  serum: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="175" y="100" width="50" height="120" rx="8" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="185" y="80" width="30" height="25" rx="4" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/><circle cx="200" cy="62" r="5" fill={c} opacity="0.2" stroke={c} strokeWidth="1.5"/></svg>,
  perfume: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="160" y="110" width="80" height="110" rx="6" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><rect x="180" y="90" width="40" height="25" rx="3" fill={c} opacity="0.1" stroke={c} strokeWidth="1.5"/><rect x="185" y="72" width="30" height="8" rx="4" fill="none" stroke={c} strokeWidth="1.5"/></svg>,
  hairdryer: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><circle cx="200" cy="120" r="40" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><circle cx="200" cy="120" r="25" fill="none" stroke={c} strokeWidth="1.5" opacity="0.3"/><rect x="190" y="158" width="20" height="80" rx="8" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/></svg>,
  lipstick: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="180" y="120" width="40" height="100" rx="4" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><path d="M180 120 L185 85 Q200 70 215 85 L220 120" fill={c} opacity="0.15" stroke={c} strokeWidth="2"/></svg>,
  coffee: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M155 110 L165 230 Q167 245 200 245 Q233 245 235 230 L245 110 Z" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><path d="M245 140 Q275 140 275 165 Q275 190 245 190" fill="none" stroke={c} strokeWidth="2" opacity="0.4"/><path d="M185 90 Q190 70 195 90" fill="none" stroke={c} strokeWidth="1.5" opacity="0.3"/><path d="M200 85 Q205 65 210 85" fill="none" stroke={c} strokeWidth="1.5" opacity="0.3"/></svg>,
  popcorn: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M150 240 L165 110 L235 110 L250 240 Z" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><circle cx="185" cy="95" r="15" fill={c} opacity="0.12"/><circle cx="210" cy="88" r="18" fill={c} opacity="0.12"/><circle cx="230" cy="98" r="14" fill={c} opacity="0.12"/></svg>,
  bottle: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="170" y="90" width="60" height="150" rx="12" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><rect x="185" y="75" width="30" height="20" rx="4" fill={c} opacity="0.1" stroke={c} strokeWidth="1.5"/><rect x="192" y="68" width="16" height="10" rx="3" fill={c} opacity="0.12"/></svg>,
  energyDrink: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="170" y="75" width="60" height="150" rx="10" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><path d="M188 140 L198 120 L192 140 L202 120" fill="none" stroke={c} strokeWidth="2.5" opacity="0.4"/></svg>,
  bar: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="110" y="125" width="180" height="50" rx="6" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><circle cx="220" cy="150" r="8" fill={c} opacity="0.12"/><circle cx="245" cy="145" r="6" fill={c} opacity="0.1"/></svg>,
  mattress: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M80 180 L80 140 Q80 130 90 128 L310 118 Q320 116 320 126 L320 170" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><path d="M80 180 L80 200 Q80 210 90 210 L310 210 Q320 210 320 200 L320 170" fill={c} opacity="0.04" stroke={c} strokeWidth="2"/><line x1="80" y1="180" x2="320" y2="170" stroke={c} strokeWidth="1.5" opacity="0.3"/></svg>,
  sofa: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="80" y="130" width="240" height="70" rx="12" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="70" y="140" width="25" height="60" rx="8" fill={c} opacity="0.1" stroke={c} strokeWidth="1.5"/><rect x="305" y="140" width="25" height="60" rx="8" fill={c} opacity="0.1" stroke={c} strokeWidth="1.5"/><rect x="95" y="110" width="210" height="25" rx="8" fill={c} opacity="0.06" stroke={c} strokeWidth="1.5"/></svg>,
  candle: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="155" y="120" width="90" height="100" rx="10" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="150" y="110" width="100" height="18" rx="5" fill={c} opacity="0.1" stroke={c} strokeWidth="1.5"/><line x1="200" y1="110" x2="200" y2="90" stroke={c} strokeWidth="2"/><ellipse cx="200" cy="82" rx="6" ry="10" fill={c} opacity="0.25"/></svg>,
  vacuum: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="185" y="50" width="30" height="160" rx="8" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><circle cx="200" cy="230" r="25" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><circle cx="200" cy="230" r="12" fill={c} opacity="0.08"/></svg>,
  desk: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="90" y="130" width="220" height="12" rx="2" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/><rect x="110" y="142" width="12" height="80" rx="2" fill={c} opacity="0.08" stroke={c} strokeWidth="1.5"/><rect x="278" y="142" width="12" height="80" rx="2" fill={c} opacity="0.08" stroke={c} strokeWidth="1.5"/></svg>,
  pillow: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><ellipse cx="200" cy="150" rx="100" ry="50" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><ellipse cx="200" cy="145" rx="85" ry="38" fill={c} opacity="0.04"/></svg>,
  pills: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="155" y="100" width="90" height="100" rx="10" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><circle cx="180" cy="145" r="10" fill={c} opacity="0.15"/><circle cx="210" cy="135" r="10" fill={c} opacity="0.15"/><circle cx="195" cy="165" r="10" fill={c} opacity="0.15"/></svg>,
  protein: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M155 100 L155 230 Q155 240 165 240 L235 240 Q245 240 245 230 L245 100 Q245 80 200 75 Q155 80 155 100 Z" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><rect x="165" y="130" width="70" height="40" rx="4" fill={c} opacity="0.08"/></svg>,
  massager: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><circle cx="200" cy="110" r="30" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="188" y="138" width="24" height="100" rx="10" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><circle cx="200" cy="110" r="6" fill={c} opacity="0.15"/></svg>,
  yogaMat: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><ellipse cx="200" cy="150" rx="30" ry="60" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><ellipse cx="200" cy="150" rx="22" ry="52" fill={c} opacity="0.04"/><path d="M230 140 L320 130 Q330 128 330 140 L330 160 Q330 170 320 168 L230 160" fill={c} opacity="0.05" stroke={c} strokeWidth="1.5"/></svg>,
  sachet: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="150" y="100" width="100" height="130" rx="4" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><path d="M150 100 L175 85 L225 85 L250 100" fill={c} opacity="0.04" stroke={c} strokeWidth="1.5"/><rect x="165" y="140" width="70" height="30" rx="3" fill={c} opacity="0.08"/></svg>,
  wearable: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="165" y="110" width="70" height="80" rx="14" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><path d="M170 150 Q120 150 115 145 Q110 140 115 135 Q120 130 170 130" fill="none" stroke={c} strokeWidth="3" opacity="0.3"/><path d="M230 150 Q280 150 285 145 Q290 140 285 135 Q280 130 230 130" fill="none" stroke={c} strokeWidth="3" opacity="0.3"/></svg>,
  ring: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><ellipse cx="200" cy="170" rx="60" ry="30" fill="none" stroke={c} strokeWidth="3"/><ellipse cx="200" cy="170" rx="50" ry="22" fill={c} opacity="0.04"/><path d="M190 142 L195 118 L200 110 L205 118 L210 142" fill={c} opacity="0.15" stroke={c} strokeWidth="1.5"/><circle cx="200" cy="108" r="8" fill={c} opacity="0.2" stroke={c} strokeWidth="1.5"/></svg>,
  dress: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M180 50 Q190 48 200 47 Q210 48 220 50 L225 80 Q230 90 240 100 L270 160 Q280 180 280 200 L280 260 Q280 268 270 270 L130 270 Q120 268 120 260 L120 200 Q120 180 130 160 L160 100 Q170 90 175 80 Z" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><line x1="200" y1="80" x2="200" y2="180" stroke={c} strokeWidth="1" opacity="0.2"/></svg>,
  jeans: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M148 40 L145 55 Q140 90 138 140 L128 255 Q127 265 135 267 L165 267 Q171 265 170 257 L178 170 Q183 155 188 155 Q193 155 198 170 L206 257 Q207 265 213 267 L243 267 Q250 265 249 255 L239 140 Q237 90 233 55 L230 40 Z" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><line x1="148" y1="40" x2="230" y2="40" stroke={c} strokeWidth="3"/><path d="M182 40 L182 80" stroke={c} strokeWidth="1.5" opacity="0.3"/></svg>,
  watch: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><circle cx="200" cy="150" r="50" fill={c} opacity="0.06" stroke={c} strokeWidth="3"/><circle cx="200" cy="150" r="42" fill={c} opacity="0.03"/><line x1="200" y1="150" x2="200" y2="120" stroke={c} strokeWidth="2.5" strokeLinecap="round"/><line x1="200" y1="150" x2="220" y2="140" stroke={c} strokeWidth="2" strokeLinecap="round"/><path d="M185 100 L185 60 Q185 55 190 55 L210 55 Q215 55 215 60 L215 100" fill={c} opacity="0.05" stroke={c} strokeWidth="1.5"/><path d="M185 200 L185 240 Q185 245 190 245 L210 245 Q215 245 215 240 L215 200" fill={c} opacity="0.05" stroke={c} strokeWidth="1.5"/></svg>,
  wine: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M170 80 Q170 140 200 160 Q230 140 230 80 Z" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><line x1="200" y1="160" x2="200" y2="230" stroke={c} strokeWidth="2.5"/><line x1="175" y1="230" x2="225" y2="230" stroke={c} strokeWidth="2.5" strokeLinecap="round"/></svg>,
  stroller: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><circle cx="170" cy="230" r="25" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="270" cy="230" r="25" fill="none" stroke={c} strokeWidth="2.5"/><path d="M155 180 L140 100 L160 100" fill="none" stroke={c} strokeWidth="3"/><path d="M160 100 Q180 90 220 100 L260 120 L270 180 Q270 200 250 200 L160 200 Q145 200 145 185 Z" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><line x1="270" y1="180" x2="280" y2="110" stroke={c} strokeWidth="2.5"/></svg>,
  babyBottle: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="170" y="100" width="60" height="130" rx="10" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><path d="M175 100 Q175 75 200 70 Q225 75 225 100" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><ellipse cx="200" cy="70" rx="12" ry="8" fill={c} opacity="0.15" stroke={c} strokeWidth="1.5"/><line x1="185" y1="140" x2="215" y2="140" stroke={c} strokeWidth="1" opacity="0.3"/><line x1="185" y1="160" x2="215" y2="160" stroke={c} strokeWidth="1" opacity="0.3"/><line x1="185" y1="180" x2="215" y2="180" stroke={c} strokeWidth="1" opacity="0.3"/></svg>,
  diaper: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M140 110 L150 90 L250 90 L260 110 L265 190 Q200 230 135 190 Z" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><ellipse cx="200" cy="150" rx="35" ry="25" fill={c} opacity="0.06"/><rect x="175" y="88" width="50" height="12" rx="3" fill={c} opacity="0.15"/></svg>,
  toy: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><circle cx="200" cy="130" r="40" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><circle cx="188" cy="120" r="5" fill={c} opacity="0.3"/><circle cx="212" cy="120" r="5" fill={c} opacity="0.3"/><path d="M190 140 Q200 150 210 140" fill="none" stroke={c} strokeWidth="2" opacity="0.3"/><rect x="185" y="170" width="30" height="60" rx="4" fill={c} opacity="0.06" stroke={c} strokeWidth="1.5"/><line x1="170" y1="185" x2="185" y2="180" stroke={c} strokeWidth="2"/><line x1="215" y1="180" x2="230" y2="185" stroke={c} strokeWidth="2"/></svg>,
  blocks: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="140" y="160" width="60" height="60" rx="4" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/><rect x="200" y="160" width="60" height="60" rx="4" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="170" y="100" width="60" height="60" rx="4" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><circle cx="155" cy="175" r="4" fill={c} opacity="0.3"/><circle cx="175" cy="175" r="4" fill={c} opacity="0.3"/><circle cx="185" cy="115" r="4" fill={c} opacity="0.3"/><circle cx="215" cy="115" r="4" fill={c} opacity="0.3"/></svg>,
  watch: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><circle cx="200" cy="150" r="50" fill={c} opacity="0.06" stroke={c} strokeWidth="2.5"/><circle cx="200" cy="150" r="42" fill="none" stroke={c} strokeWidth="1.5" opacity="0.3"/><line x1="200" y1="150" x2="200" y2="118" stroke={c} strokeWidth="2.5"/><line x1="200" y1="150" x2="222" y2="140" stroke={c} strokeWidth="2"/><circle cx="200" cy="150" r="3" fill={c} opacity="0.4"/><rect x="190" y="95" width="20" height="10" rx="2" fill={c} opacity="0.12"/><rect x="190" y="195" width="20" height="10" rx="2" fill={c} opacity="0.12"/></svg>,
  pod: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M160 130 L170 100 Q200 85 230 100 L240 130 L245 190 Q200 210 155 190 Z" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><ellipse cx="200" cy="100" rx="30" ry="10" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/><circle cx="200" cy="155" r="15" fill={c} opacity="0.1"/></svg>,
  kettle: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><ellipse cx="200" cy="220" rx="60" ry="12" fill={c} opacity="0.06"/><path d="M155 120 L155 200 Q155 215 170 220 L230 220 Q245 215 245 200 L245 120" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><ellipse cx="200" cy="120" rx="45" ry="12" fill={c} opacity="0.1" stroke={c} strokeWidth="2"/><path d="M245 140 Q275 145 275 165 Q275 185 245 190" fill="none" stroke={c} strokeWidth="2.5"/></svg>,
  pan: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><ellipse cx="190" cy="160" rx="65" ry="20" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><line x1="255" y1="155" x2="340" y2="135" stroke={c} strokeWidth="4" strokeLinecap="round"/></svg>,
  razor: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="185" y="70" width="30" height="40" rx="4" fill={c} opacity="0.15" stroke={c} strokeWidth="2"/><rect x="192" y="110" width="16" height="130" rx="4" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><line x1="188" y1="80" x2="212" y2="80" stroke={c} strokeWidth="1" opacity="0.3"/><line x1="188" y1="90" x2="212" y2="90" stroke={c} strokeWidth="1" opacity="0.3"/><line x1="188" y1="100" x2="212" y2="100" stroke={c} strokeWidth="1" opacity="0.3"/></svg>,
  toothbrush: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="192" y="60" width="16" height="180" rx="8" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="185" y="55" width="30" height="35" rx="6" fill={c} opacity="0.12" stroke={c} strokeWidth="2"/></svg>,
  detergent: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="160" y="100" width="80" height="130" rx="8" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="175" y="80" width="50" height="25" rx="4" fill={c} opacity="0.12" stroke={c} strokeWidth="1.5"/><rect x="190" y="68" width="20" height="16" rx="3" fill={c} opacity="0.15"/></svg>,
  pet: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><ellipse cx="200" cy="170" rx="40" ry="35" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><circle cx="200" cy="130" r="25" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><circle cx="192" cy="124" r="4" fill={c} opacity="0.3"/><circle cx="208" cy="124" r="4" fill={c} opacity="0.3"/><ellipse cx="200" cy="135" rx="5" ry="3" fill={c} opacity="0.3"/><path d="M175 105 L168 85" stroke={c} strokeWidth="2.5" strokeLinecap="round"/><path d="M225 105 L232 85" stroke={c} strokeWidth="2.5" strokeLinecap="round"/></svg>,
  laptop: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="120" y="90" width="160" height="110" rx="6" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><rect x="130" y="98" width="140" height="90" rx="2" fill={c} opacity="0.04"/><path d="M100 200 L120 200 L120 205 L280 205 L280 200 L300 200 Q305 212 300 215 L100 215 Q95 212 100 200" fill={c} opacity="0.1" stroke={c} strokeWidth="1.5"/></svg>,
  tv: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="100" y="70" width="200" height="140" rx="6" fill={c} opacity="0.06" stroke={c} strokeWidth="2.5"/><rect x="108" y="78" width="184" height="124" rx="2" fill={c} opacity="0.04"/><rect x="180" y="215" width="40" height="8" rx="2" fill={c} opacity="0.12"/><rect x="160" y="223" width="80" height="5" rx="2" fill={c} opacity="0.08"/></svg>,
  gamepad: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><path d="M130 150 Q130 120 160 110 L240 110 Q270 120 270 150 L280 200 Q280 220 260 220 L240 220 Q230 220 225 200 L175 200 Q170 220 160 220 L140 220 Q120 220 120 200 Z" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><circle cx="230" cy="145" r="6" fill={c} opacity="0.2"/><circle cx="248" cy="155" r="6" fill={c} opacity="0.2"/><rect x="160" y="140" width="20" height="5" rx="2" fill={c} opacity="0.2"/><rect x="168" y="132" width="5" height="20" rx="2" fill={c} opacity="0.2"/></svg>,
  printer: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="130" y="120" width="140" height="80" rx="6" fill={c} opacity="0.08" stroke={c} strokeWidth="2"/><rect x="155" y="90" width="90" height="35" rx="3" fill={c} opacity="0.06" stroke={c} strokeWidth="1.5"/><rect x="155" y="195" width="90" height="30" rx="3" fill={c} opacity="0.06" stroke={c} strokeWidth="1.5"/><circle cx="250" cy="145" r="4" fill={c} opacity="0.3"/></svg>,
  greeting: (c) => <svg viewBox="0 0 400 300" style={{width:"100%",height:"100%"}}><rect width="400" height="300" fill="#f0f4f8"/><rect x="130" y="80" width="140" height="140" rx="4" fill={c} opacity="0.06" stroke={c} strokeWidth="2"/><path d="M180 140 Q190 120 200 140 Q210 120 220 140" fill="none" stroke={c} strokeWidth="2.5" opacity="0.4"/><rect x="155" y="170" width="90" height="8" rx="2" fill={c} opacity="0.08"/><rect x="165" y="185" width="70" height="6" rx="2" fill={c} opacity="0.06"/></svg>,
};

// Product to illustration mapping
const PM = {};
function mapP(name, type, color) { PM[name] = [type, color]; }

// Fashion - Eyewear
mapP("Oakley Holbrook Sunglasses","sunglasses","#f97316");
mapP("Ray-Ban Wayfarer","sunglasses","#64748b");
mapP("Warby Parker Durand","sunglasses","#a855f7");
mapP("Maui Jim Peahi","sunglasses","#14b8a6");
mapP("Prada PR 17WS","sunglasses","#c084fc");
// Fashion - Footwear
mapP("Nike Air Force 1","sneaker","#e2e8f0");
mapP("Adidas Ultraboost","sneaker","#fb923c");
mapP("Golden Goose Superstar","sneaker","#fbbf24");
mapP("Allbirds Wool Runner","sneaker","#84cc16");
mapP("Dr. Martens 1460 Boot","sneaker","#ef4444");
mapP("Birkenstock Arizona","sneaker","#a16207");
// Fashion - Activewear
mapP("Lululemon Align Leggings","leggings","#a855f7");
mapP("Lululemon Define Jacket","jacket","#14b8a6");
mapP("Lululemon Everywhere Belt Bag","bag","#3b82f6");
mapP("Vuori Sunday Performance Jogger","jogger","#64748b");
mapP("Vuori Kore Short","shorts","#fb923c");
mapP("Alo Yoga Airlift Bra","leggings","#ec4899");
mapP("Nike Dri-FIT T-Shirt","shirt","#fb923c");
mapP("Gymshark Vital Seamless Legging","leggings","#3b82f6");
// Fashion - Designer Clothing
mapP("Gucci GG Canvas Belt","belt","#84cc16");
mapP("Ralph Lauren Polo Shirt","shirt","#ec4899");
mapP("True Religion Super T Jeans","jeans","#3b82f6");
mapP("Burberry Check Scarf","shirt","#d97706");
mapP("Canada Goose Expedition Parka","jacket","#94a3b8");
mapP("North Face Nuptse Jacket","jacket","#ef4444");
// Fashion - Bags & Accessories
mapP("Coach Tabby Shoulder Bag","bag","#3b82f6");
mapP("Louis Vuitton Neverfull","bag","#a16207");
mapP("Tory Burch Fleming Bag","bag","#e11d48");
// Electronics - Audio
mapP("Apple AirPods Pro 2","earbuds","#e2e8f0");
mapP("Bose QuietComfort Headphones","headphones","#94a3b8");
mapP("JBL Flip 6 Speaker","speaker","#ef4444");
mapP("Beats Solo 4","headphones","#e11d48");
mapP("Sonos One Speaker","speaker","#64748b");
// Electronics - Cables & Accessories
mapP("Monster HDMI Cable (6ft)","cable","#22c55e");
mapP("HP 63XL Ink Cartridge","cartridge","#14b8a6");
mapP("OtterBox iPhone Case","phoneCase","#f97316");
mapP("Apple MagSafe Charger","charger","#8b5cf6");
mapP("Apple Lightning Cable","cable","#e2e8f0");
mapP("Epson 502 Ink (4-Pack)","cartridge","#3b82f6");
// Electronics - Smart Devices
mapP("Apple Watch Ultra Band","wearable","#f97316");
mapP("Logitech MX Master 3S","charger","#64748b");
mapP("Ring Video Doorbell","charger","#3b82f6");
// Beauty - Skincare
mapP("La Mer Moisturizing Cream","cream","#fbbf24");
mapP("Estée Lauder Night Repair","serum","#c084fc");
mapP("SK-II Treatment Essence","serum","#3b82f6");
mapP("Drunk Elephant Protini","cream","#14b8a6");
mapP("Sunday Riley Good Genes","serum","#fb7185");
mapP("Tatcha Dewy Skin Cream","cream","#ec4899");
// Beauty - Fragrance
mapP("Chanel No. 5 (3.4oz)","perfume","#fb7185");
mapP("Tom Ford Oud Wood (1.7oz)","perfume","#d97706");
mapP("Jo Malone Wood Sage (3.4oz)","perfume","#84cc16");
mapP("Dior Sauvage (3.4oz)","perfume","#3b82f6");
// Beauty - Hair & Cosmetics
mapP("Dyson Airwrap","hairdryer","#f472b6");
mapP("MAC Lipstick","lipstick","#e11d48");
mapP("Olaplex No. 3 Hair Repair","serum","#fbbf24");
mapP("Charlotte Tilbury Pillow Talk","lipstick","#f472b6");
// Food - Coffee & Drinks
mapP("Starbucks Grande Latte","coffee","#92400e");
mapP("Red Bull (12oz)","energyDrink","#3b82f6");
mapP("Restaurant Glass of Wine","wine","#7c3aed");
mapP("Restaurant Fountain Soda","bottle","#ef4444");
mapP("Smoothie King Medium","bottle","#ec4899");
// Food - Snacks & Water
mapP("AMC Popcorn (Large)","popcorn","#facc15");
mapP("Dasani Water (20oz)","bottle","#fb923c");
mapP("Fiji Water (1L)","bottle","#14b8a6");
mapP("Kind Bar (Single)","bar","#a16207");
mapP("Hotel Minibar Snack","bar","#ef4444");
// Home - Furniture
mapP("Tempur-Pedic Mattress (Queen)","mattress","#a78bfa");
mapP("RH Cloud Sofa","sofa","#78716c");
mapP("West Elm Mid-Century Desk","desk","#d97706");
mapP("Casper Original Pillow","pillow","#e0e7ff");
mapP("Pottery Barn York Sofa","sofa","#a16207");
// Home - Décor & Cleaning
mapP("Yankee Candle (Large Jar)","candle","#fb923c");
mapP("Dyson V15 Detect Vacuum","vacuum","#7c3aed");
mapP("S'well Water Bottle","bottle","#14b8a6");
mapP("Hallmark Greeting Card","greeting","#ec4899");
mapP("Crate & Barrel Throw Blanket","pillow","#a78bfa");
mapP("Diptyque Candle (6.5oz)","candle","#fbbf24");
// Health - Supplements & Medicine
mapP("Advil Ibuprofen (100ct)","pills","#ef4444");
mapP("Optimum Nutrition Whey (2lb)","protein","#eab308");
mapP("Liquid I.V. Hydration (16pk)","sachet","#fb923c");
mapP("AG1 Athletic Greens (30-day)","sachet","#22c55e");
mapP("Allegra Allergy (30ct)","pills","#8b5cf6");
mapP("Vital Proteins Collagen (20oz)","protein","#f472b6");
// Health - Fitness Gear
mapP("Theragun Mini","massager","#14b8a6");
mapP("Lululemon Reversible Mat","yogaMat","#10b981");
mapP("Peloton Cycling Shoes","sneaker","#ef4444");
mapP("Hydro Flask 32oz","bottle","#3b82f6");
// Health - Wearables
mapP("Whoop 4.0 (Annual)","wearable","#6366f1");
mapP("Oura Ring Gen 3","ring","#94a3b8");
// Jewelry & Weddings - Diamonds & Jewelry
mapP("Tiffany Diamond Solitaire (1ct)","ring","#38bdf8");
mapP("David Yurman Cable Bracelet","ring","#d97706");
mapP("Pandora Charm Bracelet","ring","#ec4899");
mapP("Cartier Love Bracelet","ring","#fbbf24");
mapP("Tiffany Return to Heart Tag","ring","#38bdf8");
// Jewelry & Weddings - Wedding
mapP("Vera Wang Wedding Dress","dress","#e0e7ff");
mapP("Wedding Venue Flowers","candle","#ec4899");
mapP("Wedding Cake (3-Tier)","popcorn","#f472b6");
mapP("Designer Bridal Veil","dress","#c084fc");
mapP("Wedding Invitations (100)","greeting","#3b82f6");
mapP("Wedding Favors (100 bags)","bar","#ec4899");
// New product mappings
mapP("Fjallraven Kanken Backpack","bag","#3b82f6");
mapP("Zara Wool Blend Coat","jacket","#64748b");
mapP("H&M Premium Linen Shirt","shirt","#22c55e");
mapP("Crocs Classic Clog","sneaker","#3b82f6");
mapP("MacBook Air M3","wearable","#94a3b8");
mapP("iPad 10th Gen","wearable","#64748b");
mapP("Samsung Galaxy S24 Case (OEM)","charger","#3b82f6");
mapP("Canon PIXMA Ink (5-pack)","charger","#ef4444");
mapP("Dyson Corrale Straightener","serum","#c084fc");
mapP("Coca-Cola (restaurant glass)","bottle","#ef4444");
mapP("Twinings Earl Grey (20 bags)","coffee","#3b82f6");
mapP("KitchenAid Artisan Stand Mixer","vacuum","#ef4444");
mapP("Le Creuset Dutch Oven (5.5qt)","sofa","#f97316");
mapP("Swiffer WetJet Refill (24ct)","vacuum","#22c55e");
mapP("Gillette Fusion5 (8-pack)","pills","#3b82f6");
mapP("Crest Whitestrips (20ct)","pills","#38bdf8");
mapP("Fitbit Charge 6","wearable","#22c55e");
mapP("Ray-Ban Meta Smart Glasses","sunglasses","#3b82f6");
mapP("Seresto Flea Collar (dog)","pet","#3b82f6");
mapP("Royal Canin Dog Food 30lb","pet","#ef4444");
mapP("Greenies Dental Treats (36oz)","pet","#22c55e");
mapP("Cartier Love Bracelet (gold)","ring","#3b82f6");
mapP("Swarovski Crystal Necklace","ring","#c084fc");
mapP("Uniqlo Heattech (3-pack)","shirt","#ef4444");

function getIll(name) {
  const e = PM[name];
  if (!e) return I.sunglasses("#94a3b8");
  return (I[e[0]] || I.sunglasses)(e[1]);
}

// ─── CATEGORIES WITH SUBCATEGORIES ───
const CATEGORIES = [
  { id:"fashion", name:"Fashion & Apparel", icon:"👕", subs: [
    { name:"Eyewear", products: [
      { name:"Oakley Holbrook Sunglasses", cost:15, retail:186, alt:"Knockaround Premiums", altUrl:"https://knockaround.com", altPrice:28, source:"LensCrafters founder: frames $4-$15; Luxottica ~64% gross margin (CBS, Freakonomics)" },
      { name:"Persol 649 Sunglasses", cost:18, retail:310, alt:"MVMT Reveler", altUrl:"https://mvmt.com", altPrice:45, source:"Luxottica handmade line; frame COGS ~$15-$25" },
      { name:"Ray-Ban Wayfarer", cost:15, retail:195, alt:"Zenni Optical", altUrl:"https://zenni.com", altPrice:16, source:"Luxottica markups ~1,000% (LA Times, 2019)" },
      { name:"Warby Parker Durand", cost:12, retail:95, alt:"EyeBuyDirect", altUrl:"https://eyebuydirect.com", altPrice:12, source:"Warby disrupted Luxottica but frames still cost ~$12-$15 to produce" },
      { name:"Maui Jim Peahi", cost:18, retail:280, alt:"Knockaround Sport", altUrl:"https://knockaround.com", altPrice:35, source:"Premium polarized lenses add ~$5 to BOM; still under $20 total" },
      { name:"Prada PR 17WS", cost:16, retail:405, alt:"Zenni Premium", altUrl:"https://zenni.com", altPrice:24, source:"Luxottica-made; frame COGS $4-$15 (LensCrafters founder)" },
    ]},
    { name:"Footwear", products: [
      { name:"Nike Air Force 1", cost:22, retail:115, alt:"Decathlon sneakers", altUrl:"https://decathlon.com", altPrice:30, source:"~$22 production (SneakerLegal); ~$15 factory cost (ShoeMakersAcademy)" },
      { name:"Adidas Ultraboost", cost:30, retail:190, alt:"New Balance FuelCell", altUrl:"https://newbalance.com", altPrice:100, source:"SoleReview: $30 factory cost; Adidas ~44-46% gross margins" },
      { name:"New Balance 550", cost:18, retail:110, alt:"Puma Cali Dream", altUrl:"https://puma.com", altPrice:50, source:"NB ~45% gross margin; retro sneaker BOM ~$15-$20" },
      { name:"Golden Goose Superstar", cost:35, retail:530, alt:"Gola Classics", altUrl:"https://gola.co.uk", altPrice:70, source:"Intentionally distressed sneaker; leather shoe COGS ~$30-$40" },
      { name:"Allbirds Wool Runner", cost:20, retail:98, alt:"Amazon Essentials Knit", altUrl:"https://www.amazon.com/s?k=Amazon+Essentials+Knit", altPrice:28, source:"Allbirds ~54% gross margin (SEC IPO filing)" },
      { name:"Dr. Martens 1460 Boot", cost:25, retail:180, alt:"Thursday Boot Co.", altUrl:"https://thursdayboots.com", altPrice:100, source:"Dr. Martens ~63% gross margin (SEC filings); moved production to Asia" },
      { name:"Converse Chuck Taylor", cost:8, retail:60, alt:"Amazon Essentials canvas sneaker", altUrl:"https://www.amazon.com/s?k=Amazon+Essentials+canvas+sneaker", altPrice:18, source:"Nike (Converse parent) ~44% gross margin; canvas shoe COGS ~$6-$10" },
      { name:"Vans Old Skool", cost:10, retail:70, alt:"Airwalk One", altUrl:"https://www.amazon.com/s?k=Airwalk+One", altPrice:25, source:"VF Corp ~55% gross margin; canvas/suede shoe COGS ~$8-$12" },
      { name:"Crocs Classic Clog", cost:5, retail:50, alt:"Amazon Basics clogs", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+clogs", altPrice:15, source:"Croslite foam COGS ~$3-$6; Crocs ~56% gross margin (SEC)" },
      { name:"Birkenstock Arizona", cost:12, retail:110, alt:"Cushionaire (Amazon)", altUrl:"https://www.amazon.com/s?k=Cushionaire+Amazon", altPrice:25, source:"Birkenstock ~62% gross margin (SEC IPO); cork/rubber COGS ~$10-$15" },
    ]},
    { name:"Activewear", products: [
      { name:"Lululemon Align Leggings", cost:25, retail:98, alt:"CRZ Yoga (Amazon)", altUrl:"https://www.amazon.com/s?k=CRZ+Yoga+Amazon", altPrice:24, source:"~59% gross margin (SEC); factory $7-$15/unit (Accio)" },
      { name:"Lululemon Define Jacket", cost:22, retail:128, alt:"90 Degree by Reflex", altUrl:"https://www.amazon.com/s?k=90+Degree+by+Reflex", altPrice:28, source:"~59% gross margin (SEC); jacket factory $12-$30 (Accio)" },
      { name:"Lululemon Everywhere Belt Bag", cost:7, retail:38, alt:"Amazon Basics Belt Bag", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+Belt+Bag", altPrice:12, source:"~59% gross margin; small accessory" },
      { name:"Vuori Sunday Performance Jogger", cost:17, retail:104, alt:"Champion Powerblend", altUrl:"https://www.amazon.com/s?k=Champion+Powerblend", altPrice:30, source:"~60% gross margins (MineThatData)" },
      { name:"Vuori Kore Short", cost:11, retail:68, alt:"Baleaf Athletic Shorts", altUrl:"https://www.amazon.com/s?k=Baleaf+Athletic+Shorts", altPrice:18, source:"~60% gross margins (MineThatData)" },
      { name:"Alo Yoga Airlift Bra", cost:8, retail:68, alt:"Core 10 (Amazon)", altUrl:"https://www.amazon.com/s?k=Core+10+Amazon", altPrice:18, source:"Alo Yoga estimated ~65% gross margin; sports bra COGS $5-$10" },
      { name:"Nike Dri-FIT T-Shirt", cost:4, retail:35, alt:"Hanes Cool-DRI", altUrl:"https://www.amazon.com/s?k=Hanes+Cool-DRI", altPrice:8, source:"Nike ~46% gross margin (SEC); polyester tee COGS ~$3-$5" },
      { name:"Adidas Adilette Slides", cost:3, retail:35, alt:"Amazon slides", altUrl:"https://www.amazon.com/s?k=Amazon+slides", altPrice:10, source:"EVA foam COGS ~$2-$4; adidas ~50% gross margin (SEC)" },
      { name:"Gymshark Vital Seamless Legging", cost:8, retail:60, alt:"Sunzel Leggings (Amazon)", altUrl:"https://www.amazon.com/s?k=Sunzel+Leggings+Amazon", altPrice:15, source:"Seamless knit legging COGS ~$6-$10; Gymshark estimated ~60% margin" },
    ]},
    { name:"Designer Clothing", products: [
      { name:"Gucci GG Canvas Belt", cost:12, retail:450, alt:"Anson Belt & Buckle", altUrl:"https://ansonbelt.com", altPrice:35, source:"Kering ~75% gross margin (SEC)" },
      { name:"Ralph Lauren Polo Shirt", cost:8, retail:110, alt:"Goodthreads (Amazon)", altUrl:"https://www.amazon.com/s?k=Goodthreads+Amazon", altPrice:20, source:"Ralph Lauren ~67% gross margin (SEC)" },
      { name:"True Religion Super T Jeans", cost:50, retail:335, alt:"Levi's 501 Original", altUrl:"https://levi.com", altPrice:60, source:"WSJ: ~$50 to make; wholesale $152, retail $335" },
      { name:"Burberry Check Scarf", cost:15, retail:530, alt:"Johnstons of Elgin", altUrl:"https://johnstonsofelgin.com", altPrice:100, source:"Burberry ~70% gross margin (SEC); cashmere scarf COGS ~$15-$25" },
      { name:"Levi's 501 Original Jeans", cost:12, retail:70, alt:"Amazon Essentials jeans", altUrl:"https://www.amazon.com/s?k=Amazon+Essentials+jeans", altPrice:22, source:"Levi Strauss ~57% gross margin (SEC); denim COGS ~$8-$15" },
      { name:"Canada Goose Expedition Parka", cost:150, retail:1395, alt:"Eddie Bauer Superior Down", altUrl:"https://eddiebauer.com", altPrice:200, source:"Canada Goose ~63% gross margin (SEC filings)" },
      { name:"Patagonia Better Sweater", cost:20, retail:139, alt:"Columbia Steens Mountain", altUrl:"https://columbia.com", altPrice:35, source:"Fleece jacket COGS ~$15-$25; Patagonia sustainability + brand premium" },
      { name:"North Face Nuptse Jacket", cost:35, retail:320, alt:"Amazon Essentials Puffer", altUrl:"https://www.amazon.com/s?k=Amazon+Essentials+Puffer", altPrice:45, source:"VF Corp (parent) ~55% gross margin; puffer COGS ~$30-$40" },
    ]},
    { name:"Bags & Accessories", products: [
      { name:"Coach Tabby Shoulder Bag", cost:30, retail:395, alt:"Quince Leather Bag", altUrl:"https://onequince.com", altPrice:80, source:"Tapestry ~72% gross margin (SEC)" },
      { name:"Louis Vuitton Neverfull", cost:50, retail:2030, alt:"Cuyana Classic Tote", altUrl:"https://cuyana.com", altPrice:195, source:"LVMH fashion/leather ~70% gross margin; canvas bag materials ~$40-$60" },
      { name:"Samsonite Carry-On Suitcase", cost:40, retail:200, alt:"Amazon Basics hardside", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+hardside", altPrice:60, source:"Samsonite ~57% gross margin (SEC); polycarbonate COGS ~$30-$50" },
      { name:"Tory Burch Fleming Bag", cost:35, retail:398, alt:"JW Pei Gabbi", altUrl:"https://jwpei.com", altPrice:70, source:"Capri Holdings ~65% gross margin; leather bag COGS ~$30-$45" },
      { name:"Fjallraven Kanken Backpack", cost:12, retail:80, alt:"Vaschy Classic Backpack", altUrl:"https://www.amazon.com/s?k=Vaschy+Classic+Backpack", altPrice:25, source:"Vinylon F fabric backpack COGS ~$8-$15; Fjallraven ~65% gross margin" },
    ]},
    { name:"Global Fast Fashion", products: [
      { name:"Zara Wool Blend Coat", cost:22, retail:169, alt:"Uniqlo Wool Coat", altUrl:"https://uniqlo.com", altPrice:80, source:"Inditex ~57% gross margin (SEC); fast fashion production in Turkey/Morocco ~$15-$30" },
      { name:"H&M Premium Linen Shirt", cost:5, retail:40, alt:"Amazon Essentials linen", altUrl:"https://www.amazon.com/s?k=Amazon+Essentials+linen", altPrice:18, source:"H&M Group ~52% gross margin (SEC); linen shirt COGS ~$3-$7 from Bangladesh" },
      { name:"Uniqlo Heattech (3-pack)", cost:3, retail:30, alt:"32 Degrees baselayer", altUrl:"https://32degrees.com", altPrice:12, source:"Synthetic thermal fabric ~$0.80-$1.50/shirt; Fast Retailing ~52% gross margin (SEC)" },
    ]},
    { name:"Watches", products: [
      { name:"Rolex Submariner (steel)", cost:2500, retail:10500, alt:"Orient Kamasu", altUrl:"https://orientwatchusa.com", altPrice:275, source:"Stainless Rolex est. £1,500-£2,500 production (Watch Exchange London); retail ~4-5x cost" },
      { name:"Omega Speedmaster", cost:800, retail:6400, alt:"Seiko Presage", altUrl:"https://seikowatches.com", altPrice:425, source:"Swatch Group ~60% gross margin; Omega production est. 10-15% of retail" },
      { name:"TAG Heuer Carrera", cost:500, retail:3600, alt:"Tissot PRX", altUrl:"https://tissotwatches.com", altPrice:375, source:"LVMH Watch division ~65% gross margin; TAG production est. $400-$600" },
      { name:"Apple Watch SE", cost:65, retail:249, alt:"Xiaomi Mi Band", altUrl:"https://xiaomi.com", altPrice:35, source:"Apple Watch BOM est. $50-$80 (Counterpoint teardown); Apple 60%+ margins" },
    ]},
  ]},
  { id:"electronics", name:"Electronics & Tech", icon:"📱", subs: [
    { name:"Audio", products: [
      { name:"Apple AirPods Pro 2", cost:51, retail:249, alt:"Samsung Galaxy Buds FE", altUrl:"https://samsung.com", altPrice:70, source:"Omdia/IHS teardown: BOM $51.47 (Electronics360)" },
      { name:"Bose QuietComfort Headphones", cost:42, retail:349, alt:"Anker Soundcore Q45", altUrl:"https://soundcore.com", altPrice:80, source:"Premium headphone COGS ~15-25% of retail" },
      { name:"JBL Flip 6 Speaker", cost:18, retail:130, alt:"Tribit StormBox", altUrl:"https://tribit.com", altPrice:36, source:"Harman (Samsung sub) consumer COGS estimate" },
      { name:"Beats Solo 4", cost:30, retail:200, alt:"Soundcore Life Q30", altUrl:"https://soundcore.com", altPrice:56, source:"Apple/Beats headphone BOM estimated ~$25-$35" },
      { name:"Marshall Stanmore III Speaker", cost:40, retail:380, alt:"JBL Charge 5", altUrl:"https://jbl.com", altPrice:150, source:"Bluetooth speaker BOM ~$30-$50; Marshall vintage brand premium 5x+" },
      { name:"Sony WH-1000XM5", cost:40, retail:350, alt:"Edifier W820NB Plus", altUrl:"https://edifier.com", altPrice:60, source:"ANC headphone BOM ~$30-$50; Sony ~40% operating margin on audio" },
      { name:"Sonos One Speaker", cost:35, retail:220, alt:"Echo Studio", altUrl:"https://www.amazon.com/s?k=Echo+Studio", altPrice:50, source:"Sonos ~45% gross margin (SEC); smart speaker BOM ~$30-$40" },
    ]},
    { name:"Cables & Accessories", products: [
      { name:"Monster HDMI Cable (6ft)", cost:1.20, retail:30, alt:"Monoprice HDMI", altUrl:"https://monoprice.com", altPrice:5, source:"Cable manufacturing: $1-$3" },
      { name:"HP 63XL Ink Cartridge", cost:3, retail:42, alt:"LD Products", altUrl:"https://ldproducts.com", altPrice:12, source:"Ink: ~$0.05/ml to produce vs $0.50-$1/ml retail" },
      { name:"OtterBox iPhone Case", cost:3, retail:50, alt:"Spigen Tough Armor", altUrl:"https://www.amazon.com/s?k=Spigen+Tough+Armor", altPrice:15, source:"Phone case mfg typically $2-$5" },
      { name:"Apple MagSafe Charger", cost:5, retail:39, alt:"Anker MagGo", altUrl:"https://www.amazon.com/s?k=Anker+MagGo", altPrice:16, source:"Wireless charging BOM under $10" },
      { name:"Apple Lightning Cable", cost:1.50, retail:19, alt:"Anker PowerLine", altUrl:"https://www.amazon.com/s?k=Anker+PowerLine", altPrice:8, source:"Cable mfg well under $3" },
      { name:"Epson 502 Ink (4-Pack)", cost:2, retail:38, alt:"Lemero compatible", altUrl:"https://www.amazon.com/s?k=Lemero+compatible", altPrice:12, source:"Printer ink ~$0.05/ml to produce" },
      { name:"Anker 20W USB-C Charger", cost:3, retail:16, alt:"Already value brand", altUrl:"https://www.amazon.com/s?k=Already+value+brand", altPrice:10, source:"USB-C charger BOM ~$2-$4; even budget brands 60%+ margins" },
    ]},
    { name:"Smart Devices", products: [
      { name:"Apple Watch Ultra Band", cost:3, retail:49, alt:"Amazon sport band", altUrl:"https://www.amazon.com/s?k=Amazon+sport+band", altPrice:8, source:"Silicone/nylon band COGS $2-$5" },
      { name:"Logitech MX Master 3S", cost:18, retail:100, alt:"Logitech M720", altUrl:"https://logitech.com", altPrice:40, source:"Logitech ~42% gross margin (SEC)" },
      { name:"Google Nest Thermostat", cost:25, retail:130, alt:"Amazon Smart Thermostat", altUrl:"https://www.amazon.com/s?k=Amazon+Smart+Thermostat", altPrice:60, source:"Thermostat BOM ~$20-$30; Google Nest ecosystem play" },
      { name:"Apple AirTag (4-pack)", cost:8, retail:99, alt:"Tile Mate (4-pack)", altUrl:"https://tile.com", altPrice:55, source:"UWB chip + coin cell BOM ~$2-$3 each; Apple ecosystem lock-in premium" },
      { name:"Amazon Echo Dot", cost:12, retail:50, alt:"(Amazon loss-leader)", altUrl:"https://www.amazon.com/s?k=Amazon+loss-leader", altPrice:22, source:"Echo Dot BOM ~$10-$15; sold near/below cost to drive ecosystem (Bloomberg)" },
      { name:"Ring Video Doorbell", cost:20, retail:100, alt:"Wyze Doorbell", altUrl:"https://wyze.com", altPrice:30, source:"Smart doorbell BOM ~$18-$25; Amazon (parent) sells ecosystem" },
    ]},
    { name:"Computers", products: [
      { name:"MacBook Air M3", cost:450, retail:1099, alt:"Acer Swift Go 14", altUrl:"https://acer.com", altPrice:650, source:"IHS/Omdia BOM estimate ~$400-$500; Apple gross margin ~46%" },
      { name:"Apple Magic Keyboard (iPad)", cost:30, retail:299, alt:"Logitech Combo Touch", altUrl:"https://logitech.com", altPrice:150, source:"Keyboard + trackpad + hinge BOM ~$25-$35; Apple accessory margins ~70%" },
      { name:"iPad 10th Gen", cost:200, retail:450, alt:"Samsung Galaxy Tab A9+", altUrl:"https://samsung.com", altPrice:220, source:"Apple iPad BOM ~$180-$220 (IHS teardown); Apple ~46% gross margin" },
      { name:"Dell XPS 13", cost:400, retail:1199, alt:"Lenovo IdeaPad Slim 5", altUrl:"https://lenovo.com", altPrice:550, source:"Dell gross margin ~37%; ultrabook BOM typically $350-$450" },
    ]},
    { name:"Gaming & TV", products: [
      { name:"PS5 DualSense Controller", cost:18, retail:75, alt:"8Bitdo Ultimate", altUrl:"https://8bitdo.com", altPrice:40, source:"Controller BOM est. $15-$20 (iFixit); Sony accessories high-margin" },
      { name:"Nintendo Switch Pro Controller", cost:15, retail:70, alt:"PowerA Enhanced", altUrl:"https://powera.com", altPrice:28, source:"Nintendo ~55% gross margin; controller electronics est. $12-$18" },
      { name:"Samsung The Frame TV 55in", cost:350, retail:1300, alt:"TCL 55in 4K", altUrl:"https://tclusa.com", altPrice:280, source:"TV panel cost ~$150-$200 for 55in; Samsung premium for design" },
      { name:"Xbox Elite Controller Series 2", cost:35, retail:180, alt:"GameSir G7 SE", altUrl:"https://gamesir.hk", altPrice:45, source:"Premium controller BOM ~$30-$40; Microsoft accessories high-margin" },
      { name:"LG OLED C4 55in", cost:600, retail:1500, alt:"Hisense U8 55in", altUrl:"https://hisense-usa.com", altPrice:550, source:"OLED panel cost ~$400-$500; LG Display ~25% margin on panels" },
    ]},
    { name:"Printers", products: [
      { name:"Sonos Beam Gen 2 Soundbar", cost:60, retail:450, alt:"Vizio V-Series 2.1", altUrl:"https://vizio.com", altPrice:120, source:"Soundbar BOM ~$50-$70; Sonos ~45% gross margin (SEC)" },
      { name:"HP LaserJet Printer", cost:90, retail:260, alt:"Brother HL-L2460DW", altUrl:"https://brother-usa.com", altPrice:150, source:"HP printer hardware sold near cost; profit from ink/toner ecosystem" },
      { name:"Canon PIXMA Ink (5-pack)", cost:3, retail:55, alt:"Smart Ink compatible", altUrl:"https://www.amazon.com/s?k=Smart+Ink+compatible", altPrice:18, source:"Ink COGS ~$0.50-$1 per cart; Canon ~60% imaging margin (SEC); ink markup 3,000%+ per ml" },
    ]},
  ]},
  { id:"beauty", name:"Beauty & Skincare", icon:"✨", subs: [
    { name:"Skincare", products: [
      { name:"La Mer Moisturizing Cream", cost:10, retail:200, alt:"Nivea Creme", altUrl:"https://nivea.com", altPrice:6, source:"Chemist: recreating under £10/100ml; mineral oil, petrolatum, glycerin" },
      { name:"Estée Lauder Night Repair", cost:5, retail:82, alt:"The Ordinary Retinol", altUrl:"https://theordinary.com", altPrice:8, source:"Estée Lauder ~76% gross margin (SEC)" },
      { name:"SK-II Treatment Essence", cost:9, retail:185, alt:"Missha First Treatment", altUrl:"https://misshaus.com", altPrice:22, source:"P&G beauty ~70% gross margin; fermented sake ingredient" },
      { name:"Augustinus Bader Rich Cream", cost:8, retail:280, alt:"La Roche-Posay Cicaplast", altUrl:"https://laroche-posay.us", altPrice:18, source:"Moisturizer COGS ~$4-$10; luxury skincare 20-30x materials" },
      { name:"Drunk Elephant Protini", cost:6, retail:68, alt:"CeraVe Moisturizer", altUrl:"https://cerave.com", altPrice:16, source:"Shiseido (parent) ~72% beauty gross margin" },
      { name:"Sunday Riley Good Genes", cost:5, retail:85, alt:"The Ordinary Lactic Acid", altUrl:"https://theordinary.com", altPrice:7, source:"Lactic acid serum COGS ~$3-$6; premium skincare margins 80%+" },
      { name:"Tatcha Dewy Skin Cream", cost:7, retail:68, alt:"Neutrogena Hydro Boost", altUrl:"https://www.amazon.com/s?k=Neutrogena+Hydro+Boost", altPrice:18, source:"Unilever (parent) ~52% gross margin; Japanese rice bran = commodity" },
      { name:"Kiehl's Ultra Facial Cream", cost:3, retail:36, alt:"Neutrogena Hydro Boost", altUrl:"https://neutrogena.com", altPrice:18, source:"L'Oréal ~74% gross margin; basic moisturizer COGS ~$2-$4" },
    ]},
    { name:"Fragrance", products: [
      { name:"Chanel No. 5 (3.4oz)", cost:10, retail:140, alt:"Dossier Woody Sage", altUrl:"https://dfrfrances.com", altPrice:29, source:"Fragrance COGS typically 3-10% of retail" },
      { name:"Tom Ford Oud Wood (1.7oz)", cost:12, retail:270, alt:"Dossier Ambery Santal", altUrl:"https://dfrfrances.com", altPrice:29, source:"Niche fragrance COGS still under $15; Estée Lauder (parent) margins" },
      { name:"Jo Malone Wood Sage (3.4oz)", cost:8, retail:145, alt:"Nest Fragrances", altUrl:"https://nestfragrances.com", altPrice:42, source:"Estée Lauder subsidiary; fragrance COGS 5-10%" },
      { name:"Dior Sauvage (3.4oz)", cost:12, retail:155, alt:"Dossier Woody Sandalwood", altUrl:"https://dfrfrances.com", altPrice:29, source:"LVMH perfume division ~75% gross margin" },
      { name:"Byredo Gypsy Water 100ml", cost:10, retail:295, alt:"Dossier Ambery Sage", altUrl:"https://dfreedossier.com", altPrice:29, source:"Niche fragrance juice ~$5-$12; Puig (Byredo parent) luxury margins" },
      { name:"Creed Aventus 3.3oz", cost:12, retail:445, alt:"Dossier Woody Chypre", altUrl:"https://dfreedossier.com", altPrice:29, source:"Fragrance juice $2-$10/bottle; Creed extreme brand premium" },
    ]},
    { name:"Hair & Cosmetics", products: [
      { name:"Dyson Airwrap", cost:75, retail:600, alt:"Shark FlexStyle", altUrl:"https://sharkbeauty.com", altPrice:250, source:"Higher motor costs but substantial margins" },
      { name:"MAC Lipstick", cost:1.50, retail:23, alt:"NYX Matte Lipstick", altUrl:"https://nyxcosmetics.com", altPrice:8, source:"Color cosmetics COGS 5-15% of retail" },
      { name:"Olaplex No. 3 Hair Repair", cost:3.50, retail:30, alt:"Aphogee Treatment", altUrl:"https://www.amazon.com/s?k=Aphogee+Treatment", altPrice:10, source:"Olaplex ~71% gross margin (SEC)" },
      { name:"IT Cosmetics CC+ Cream", cost:3, retail:47, alt:"e.l.f. Camo CC Cream", altUrl:"https://elfcosmetics.com", altPrice:14, source:"L'Oréal ~74% gross margin; CC cream COGS ~$2-$4" },
      { name:"Fenty Beauty Gloss Bomb", cost:2, retail:22, alt:"NYX Butter Gloss", altUrl:"https://nyxcosmetics.com", altPrice:5, source:"Lip gloss COGS ~$1-$3; LVMH (Fenty parent) ~68% beauty margins" },
      { name:"Charlotte Tilbury Pillow Talk", cost:2, retail:35, alt:"Maybelline SuperStay", altUrl:"https://www.amazon.com/s?k=Maybelline+SuperStay", altPrice:10, source:"Puig (parent); lipstick COGS ~$1-$3" },
      { name:"Dyson Corrale Straightener", cost:60, retail:500, alt:"Chi Original Flat Iron", altUrl:"https://www.amazon.com/s?k=Chi+Original+Flat+Iron", altPrice:40, source:"Dyson Beauty BOM est. $50-$70; Dyson ~45% gross margin (estimated)" },
    ]},
    { name:"Oral & Grooming", products: [
      { name:"Oral-B iO Series 9", cost:40, retail:300, alt:"Quip Smart Brush", altUrl:"https://getquip.com", altPrice:40, source:"Electric toothbrush BOM ~$30-$50; Procter & Gamble ~52% gross margin" },
      { name:"Gillette Fusion ProGlide (8pk)", cost:3, retail:36, alt:"Dorco Pace 6 (8pk)", altUrl:"https://dorco.com", altPrice:12, source:"Razor cartridge COGS ~$0.30-$0.50 each; Gillette >60% margins (P&G SEC)" },
      { name:"Philips Sonicare DiamondClean", cost:30, retail:170, alt:"Oral-B Pro 1000", altUrl:"https://oralb.com", altPrice:40, source:"Electric toothbrush BOM ~$20-$35; Philips ~45% Personal Health margin" },
      { name:"Dyson Supersonic Hair Dryer", cost:50, retail:430, alt:"Laifen Swift", altUrl:"https://laifen.com", altPrice:60, source:"High-speed motor + heating element BOM ~$40-$60; Dyson massive brand premium" },
    ]},
  ]},
  { id:"food", name:"Food & Beverage", icon:"🍽️", subs: [
    { name:"Coffee & Drinks", products: [
      { name:"Starbucks Grande Latte", cost:0.40, retail:5.75, alt:"Home brew (Aldi)", altUrl:"https://aldi.us", altPrice:0.5, source:"Coffee + milk ~$0.30-$0.50/latte" },
      { name:"Liquid Death Mountain Water 12pk", cost:1.50, retail:18, alt:"Tap water + reusable bottle", altUrl:"https://www.amazon.com/s?k=Tap+water+++reusable+bottle", altPrice:0, source:"Canned water COGS ~$0.10-$0.15/can; marketing brand 10x+ markup" },
      { name:"Red Bull (12oz)", cost:0.28, retail:3.49, alt:"Celsius (Costco)", altUrl:"https://costco.com", altPrice:1.5, source:"Red Bull COGS ~$0.20-$0.35/can" },
      { name:"Restaurant Glass of Wine", cost:1.50, retail:14, alt:"Costco wine", altUrl:"https://costco.com", altPrice:4, source:"Restaurants mark up wine 200-400%; glass costs ~$1-$2" },
      { name:"Restaurant Fountain Soda", cost:0.05, retail:3.29, alt:"Bring your own", altUrl:"https://www.amazon.com/s?k=reusable+water+bottle", altPrice:0, source:"Fountain soda syrup + CO2 costs ~$0.05/glass; 300-600% markup" },
      { name:"Smoothie King Medium", cost:0.80, retail:7.49, alt:"Homemade smoothie", altUrl:"https://www.amazon.com/s?k=portable+blender", altPrice:1.5, source:"Fruit + yogurt + ice costs under $1; smoothie bars 400%+ markup" },
    ]},
    { name:"Snacks & Water", products: [
      { name:"AMC Popcorn (Large)", cost:0.35, retail:9.50, alt:"Orville Redenbacher", altUrl:"https://walmart.com", altPrice:0.5, source:"Theater concessions: 85-90% margins" },
      { name:"Dasani Water (20oz)", cost:0.02, retail:2.29, alt:"Brita + reusable", altUrl:"https://brita.com", altPrice:0.1, source:"Water ~$0.004/gal; bottling ~$0.02" },
      { name:"Fiji Water (1L)", cost:0.03, retail:2.99, alt:"Reusable + filter", altUrl:"https://brita.com", altPrice:0.1, source:"Source water + bottle under $0.05" },
      { name:"Kind Bar (Single)", cost:0.25, retail:2.49, alt:"Kirkland Nut Bars", altUrl:"https://costco.com", altPrice:0.8, source:"Snack bar COGS ~$0.20-$0.40" },
      { name:"Celsius Energy 12-pack", cost:3, retail:22, alt:"Costco Celsius bulk", altUrl:"https://costco.com", altPrice:14, source:"RTD energy COGS ~$0.20-$0.30/can; Celsius ~48% gross margin (SEC)" },
      { name:"Häagen-Dazs Pint", cost:1, retail:6, alt:"Aldi Sundae Shoppe", altUrl:"https://aldi.us", altPrice:2.50, source:"Ice cream COGS ~$0.80-$1.20/pint; General Mills ~55% margins" },
      { name:"Hotel Minibar Snack", cost:0.50, retail:8, alt:"Pack your own", altUrl:"https://www.amazon.com/s?k=travel+snack+bag", altPrice:0.5, source:"Minibar markups 400%+ (Oyster.com)" },
      { name:"Coca-Cola (restaurant glass)", cost:0.08, retail:3, alt:"Grocery 2-liter bottle", altUrl:"https://walmart.com", altPrice:0.15, source:"Coca-Cola syrup cost ~$0.02/serving; restaurant fountain drink markup 15-20x (HuffPost)" },
    ]},
    { name:"Coffee Pods & Tea", products: [
      { name:"Nespresso Vertuo Pod", cost:0.12, retail:1.10, alt:"Compatible pods (L'OR)", altUrl:"https://www.amazon.com/s?k=Compatible+pods+LOR", altPrice:0.45, source:"Pod contains ~7g coffee ($0.05-$0.08) + aluminum capsule ($0.03-$0.05); 800%+ markup per lb (CoffeeGeek)" },
      { name:"Keurig K-Cup (name brand)", cost:0.08, retail:0.75, alt:"Solimo K-Cup (Amazon)", altUrl:"https://www.amazon.com/s?k=Solimo+K-Cup+Amazon", altPrice:0.28, source:"K-Cup contains 9-12g coffee; cost per lb $21-$43 vs $9-$15 bulk beans (CoffeeGeek)" },
      { name:"Twinings Earl Grey (20 bags)", cost:0.40, retail:5, alt:"Yorkshire Tea 80 bags", altUrl:"https://www.amazon.com/s?k=Yorkshire+Tea+80+bags", altPrice:5, source:"Tea bag COGS ~$0.01-$0.03 each; ABF (Twinings parent) ~40% margin; commodity tea marked up 10-20x" },
    ]},
    { name:"Alcohol & Dining", products: [
      { name:"Grey Goose Vodka 750ml", cost:7, retail:35, alt:"Kirkland French Vodka", altUrl:"https://costco.com", altPrice:13, source:"Vodka production cost $3-$8/bottle; spirits industry 80%+ gross margins" },
      { name:"Jack Daniel's 750ml", cost:6, retail:28, alt:"Evan Williams Bourbon", altUrl:"https://www.amazon.com/s?k=Evan+Williams+Bourbon", altPrice:13, source:"Whiskey production ~$4-$8; Brown-Forman ~62% gross margin (SEC)" },
      { name:"Oatly Oat Milk 64oz", cost:0.80, retail:5.50, alt:"Aldi SimplyNature Oat Milk", altUrl:"https://aldi.us", altPrice:2.50, source:"Oatly ~28% gross margin (SEC); oat milk COGS ~$0.60-$1.00" },
      { name:"Aperol 750ml", cost:4, retail:25, alt:"Aldi Aperini", altUrl:"https://aldi.us", altPrice:8, source:"Campari Group ~62% gross margin (SEC); aperitif production ~$3-$5/bottle" },
      { name:"Restaurant Pasta Entrée", cost:2, retail:22, alt:"Home-cooked equivalent", altUrl:"https://budgetbytes.com", altPrice:3, source:"Restaurant food cost typically 25-35% of menu price (NRA)" },
    ]},
  ]},
  { id:"home", name:"Home & Furniture", icon:"🏠", subs: [
    { name:"Furniture", products: [
      { name:"Tempur-Pedic Mattress (Queen)", cost:200, retail:2199, alt:"Zinus Green Tea", altUrl:"https://www.amazon.com/s?k=Zinus+Green+Tea", altPrice:300, source:"Foam mattress COGS $150-$300" },
      { name:"RH Cloud Sofa", cost:700, retail:5995, alt:"IKEA Kivik", altUrl:"https://ikea.com", altPrice:600, source:"RH ~63% gross margin (SEC)" },
      { name:"West Elm Mid-Century Desk", cost:85, retail:800, alt:"IKEA Bekant", altUrl:"https://ikea.com", altPrice:200, source:"Williams-Sonoma ~68% gross margin (SEC)" },
      { name:"Casper Original Pillow", cost:6, retail:65, alt:"Coop Home Goods", altUrl:"https://www.amazon.com/s?k=Coop+Home+Goods", altPrice:30, source:"Pillow COGS ~$4-$10" },
      { name:"Brooklinen Luxe Sheet Set", cost:15, retail:159, alt:"Amazon Basics 400-thread", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+400-thread", altPrice:35, source:"Cotton sateen sheets COGS ~$10-$20; DTC bedding brands 5-10x markup" },
      { name:"Pottery Barn York Sofa", cost:400, retail:2699, alt:"IKEA Ektorp", altUrl:"https://ikea.com", altPrice:500, source:"Williams-Sonoma (parent) ~68% gross margin (SEC)" },
    ]},
    { name:"Décor & Cleaning", products: [
      { name:"Yankee Candle (Large Jar)", cost:3, retail:31, alt:"TJ Maxx candles", altUrl:"https://tjmaxx.com", altPrice:8, source:"Wax + fragrance + jar: $2-$5; margins ~70-80%" },
      { name:"Dyson V15 Detect Vacuum", cost:80, retail:750, alt:"Tineco Pure ONE", altUrl:"https://tineco.com", altPrice:250, source:"High motor IP costs but high margins" },
      { name:"Aesop Reverence Hand Wash 500ml", cost:3, retail:40, alt:"Mrs. Meyer's Hand Soap", altUrl:"https://mrsmeyers.com", altPrice:4, source:"L'Oréal (Aesop parent) ~74% gross margin; premium soap ~$1-$3" },
      { name:"S'well Water Bottle", cost:4, retail:35, alt:"Hydro Flask (sale)", altUrl:"https://hydroflask.com", altPrice:15, source:"Stainless steel bottle COGS ~$3-$6" },
      { name:"Hallmark Greeting Card", cost:0.50, retail:6.99, alt:"Canva + print", altUrl:"https://canva.com", altPrice:0.5, source:"Paper + printing ~$0.30-$0.75; 200%+ markup on cards" },
      { name:"Crate & Barrel Throw Blanket", cost:12, retail:130, alt:"Amazon Basics Fleece", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+Fleece", altPrice:20, source:"Williams-Sonoma/C&B ~65% gross margin; blanket COGS ~$10-$15" },
      { name:"Diptyque Candle (6.5oz)", cost:4, retail:74, alt:"Target Threshold candle", altUrl:"https://target.com", altPrice:10, source:"Luxury candle COGS ~$3-$6; wax + fragrance + vessel" },
    ]},
    { name:"Kitchen", products: [
      { name:"KitchenAid Stand Mixer", cost:120, retail:450, alt:"Hamilton Beach Stand Mixer", altUrl:"https://hamiltonbeach.com", altPrice:80, source:"Whirlpool (KitchenAid parent) ~35% gross margin; mixer motor+gears est. $80-$120" },
      { name:"Le Creuset Dutch Oven 5.5qt", cost:45, retail:395, alt:"Lodge Enameled Dutch Oven", altUrl:"https://lodgecastiron.com", altPrice:70, source:"Cast iron + enamel COGS ~$30-$50; Le Creuset ~80% markup" },
      { name:"Yeti Rambler 20oz Tumbler", cost:5, retail:35, alt:"Ozark Trail (Walmart)", altUrl:"https://walmart.com", altPrice:10, source:"Double-wall stainless tumbler COGS ~$3-$6; Yeti ~58% gross margin (SEC)" },
      { name:"All-Clad D3 Stainless Pan", cost:30, retail:160, alt:"Tramontina Tri-Ply", altUrl:"https://www.amazon.com/s?k=Tramontina+Tri-Ply", altPrice:35, source:"Tri-ply stainless COGS ~$20-$35; All-Clad premium for US manufacture" },
      { name:"Vitamix Explorian Blender", cost:60, retail:350, alt:"Ninja Professional Plus", altUrl:"https://ninjakitchen.com", altPrice:90, source:"Blender motor + jar BOM ~$40-$70; Vitamix margins from direct-to-consumer model" },
      { name:"Nespresso Vertuo Machine", cost:60, retail:200, alt:"Black+Decker espresso maker", altUrl:"https://www.amazon.com/s?k=Black+Decker+espresso+maker", altPrice:40, source:"Machine sold near cost; profit from pod lock-in ecosystem (razor-blade model)" },
    ]},
    { name:"Laundry & Cleaning", products: [
      { name:"Tide PODS 42ct", cost:4, retail:14, alt:"Costco Kirkland PODS", altUrl:"https://costco.com", altPrice:6, source:"P&G Home Care ~55% gross margin; detergent COGS ~25-30% of retail" },
      { name:"Molton Brown Hand Wash 300ml", cost:2, retail:30, alt:"Method Hand Wash", altUrl:"https://methodhome.com", altPrice:4, source:"Liquid soap COGS ~$0.50-$2; Kao Corp (Molton Brown parent) ~65% beauty margins" },
      { name:"Mrs. Meyer's Clean Day Spray", cost:1.50, retail:5, alt:"DIY vinegar + essential oil", altUrl:"https://www.amazon.com/s?k=cleaning+spray+essential+oil", altPrice:0.50, source:"Cleaning spray ingredients ~$0.30-$0.50; fragrance + branding = premium" },
      { name:"Swiffer WetJet Refill (24ct)", cost:2, retail:14, alt:"Reusable microfiber pads", altUrl:"https://www.amazon.com/s?k=Reusable+microfiber+pads", altPrice:8, source:"Nonwoven pad COGS ~$0.05-$0.08 each; P&G razor-blade model — cheap mop, expensive refills" },
    ]},
  ]},
  { id:"health", name:"Health & Wellness", icon:"💊", subs: [
    { name:"Supplements & Medicine", products: [
      { name:"Advil Ibuprofen (100ct)", cost:0.50, retail:12, alt:"Kirkland Ibuprofen", altUrl:"https://costco.com", altPrice:4, source:"Generic ibuprofen costs pennies/pill" },
      { name:"Optimum Nutrition Whey (2lb)", cost:10, retail:40, alt:"Myprotein Impact Whey", altUrl:"https://myprotein.com", altPrice:20, source:"Whey COGS ~$8-$12/2lb; Glanbia ~32% margin" },
      { name:"Liquid I.V. Hydration (16pk)", cost:3, retail:25, alt:"Drip Drop", altUrl:"https://www.amazon.com/s?k=Drip+Drop", altPrice:12, source:"Electrolyte COGS ~$2-$4/box; Unilever ~50% margin" },
      { name:"AG1 Athletic Greens (30-day)", cost:8, retail:79, alt:"Amazing Grass", altUrl:"https://www.amazon.com/s?k=Amazing+Grass", altPrice:25, source:"Greens powder COGS ~$6-$10; ~85% estimated gross margin" },
      { name:"Garden of Life Raw Protein", cost:5, retail:42, alt:"NOW Sports Organic Plant", altUrl:"https://www.amazon.com/s?k=NOW+Sports+Organic+Plant", altPrice:20, source:"Organic plant protein COGS ~$4-$7; Nestlé Health Science ~55% margins" },
      { name:"Allegra Allergy (30ct)", cost:0.60, retail:18, alt:"Kirkland Aller-Fex", altUrl:"https://costco.com", altPrice:6, source:"Fexofenadine generic pennies/pill; brand premium 300%+" },
      { name:"Tylenol Extra Strength 100ct", cost:1, retail:10, alt:"Kirkland Acetaminophen", altUrl:"https://costco.com", altPrice:3, source:"Kenvue (Tylenol) ~62% gross margin; acetaminophen ~$0.01/tablet" },
      { name:"Vital Proteins Collagen (20oz)", cost:6, retail:47, alt:"Great Lakes Collagen", altUrl:"https://www.amazon.com/s?k=Great+Lakes+Collagen", altPrice:22, source:"Collagen powder COGS ~$5-$8; Nestlé (parent) health margins ~60%" },
    ]},
    { name:"Fitness Gear", products: [
      { name:"Theragun Mini", cost:25, retail:199, alt:"BOB AND BRAD Q2", altUrl:"https://www.amazon.com/s?k=BOB+AND+BRAD+Q2", altPrice:50, source:"BOM ~$20-$35; Alibaba comparables $15-$30" },
      { name:"Manduka PRO Yoga Mat", cost:12, retail:120, alt:"Amazon Basics Half-Inch Mat", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+yoga+mat", altPrice:20, source:"PVC/rubber mat COGS ~$8-$15; Manduka ~80% brand premium" },
      { name:"Lululemon Reversible Mat", cost:8, retail:88, alt:"Amazon Basics Mat", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+Mat", altPrice:18, source:"Yoga mat mfg ~$5-$12" },
      { name:"Peloton Cycling Shoes", cost:12, retail:145, alt:"Shimano RP1", altUrl:"https://www.amazon.com/s?k=Shimano+RP1", altPrice:50, source:"Cycling shoe COGS ~$10-$15; Peloton accessories high margin" },
      { name:"Bala Bangles 1lb pair", cost:5, retail:55, alt:"Amazon wrist weights", altUrl:"https://www.amazon.com/s?k=Amazon+wrist+weights", altPrice:12, source:"Steel + silicone COGS ~$3-$6; fitness accessory brand premium ~10x" },
      { name:"Mirror / Lululemon Studio", cost:150, retail:795, alt:"YouTube + $20 mat", altUrl:"https://youtube.com", altPrice:0, source:"LCD display + camera module BOM ~$100-$180; subscription model drives revenue" },
      { name:"Hydro Flask 32oz", cost:5, retail:45, alt:"Thermoflask (Costco)", altUrl:"https://costco.com", altPrice:16, source:"Stainless bottle COGS ~$4-$6" },
    ]},
    { name:"Wearables", products: [
      { name:"Whoop 4.0 (Annual)", cost:30, retail:239, alt:"Xiaomi Mi Band", altUrl:"https://mi.com", altPrice:35, source:"Wearable BOM ~$25-$40" },
      { name:"Garmin Forerunner 265", cost:80, retail:450, alt:"COROS PACE 3", altUrl:"https://coros.com", altPrice:230, source:"GPS watch BOM ~$60-$90; Garmin ~59% gross margin (SEC)" },
      { name:"Oura Ring Gen 3", cost:25, retail:299, alt:"RingConn", altUrl:"https://ringconn.com", altPrice:120, source:"Smart ring BOM estimated ~$20-$30; subscription revenue adds" },
      { name:"Fitbit Charge 6", cost:30, retail:160, alt:"Xiaomi Smart Band 9", altUrl:"https://xiaomi.com", altPrice:35, source:"Fitness tracker BOM ~$25-$35; Google (parent) ~55% hardware margin" },
      { name:"Ray-Ban Meta Smart Glasses", cost:80, retail:299, alt:"Fauna Audio Glasses", altUrl:"https://www.amazon.com/s?k=Fauna+Audio+Glasses", altPrice:100, source:"Camera + speakers + frame BOM ~$60-$90; Meta subsidizes for ecosystem data" },
    ]},
    { name:"Pet Health", products: [
      { name:"Blue Buffalo Dog Food 24lb", cost:8, retail:55, alt:"Costco Kirkland Nature's Domain", altUrl:"https://costco.com", altPrice:28, source:"Premium dog food COGS ~$6-$10/bag; General Mills (BB parent) ~36% gross margin (SEC)" },
      { name:"BarkBox Monthly Subscription", cost:8, retail:35, alt:"DIY toy + treat box", altUrl:"https://chewy.com", altPrice:12, source:"Dog toys + treats COGS ~$6-$10; subscription model adds convenience premium" },
      { name:"Seresto Flea Collar (dog)", cost:4, retail:60, alt:"Hartz UltraGuard Collar", altUrl:"https://www.amazon.com/s?k=Hartz+UltraGuard+Collar", altPrice:12, source:"Active ingredient + plastic collar COGS ~$3-$5; Bayer/Elanco ~65% margins on pet pharma" },
      { name:"Royal Canin Dog Food 30lb", cost:10, retail:80, alt:"Purina ONE SmartBlend 31lb", altUrl:"https://www.amazon.com/s?k=Purina+ONE+SmartBlend+31lb", altPrice:32, source:"Mars Petcare ~40% gross margin; vet-channel premium adds 2-3x vs grocery brands" },
      { name:"Greenies Dental Treats (36oz)", cost:4, retail:35, alt:"Whimzees Natural Chews", altUrl:"https://www.amazon.com/s?k=Whimzees+Natural+Chews", altPrice:18, source:"Wheat/gelatin treat COGS ~$3-$5; Mars Petcare dental segment high margin" },
    ]},
  ]},
  { id:"jewelry", name:"Jewelry & Weddings", icon:"💎", subs: [
    { name:"Diamonds & Jewelry", products: [
      { name:"Tiffany Diamond Solitaire (1ct)", cost:3500, retail:12000, alt:"Blue Nile / James Allen", altUrl:"https://bluenile.com", altPrice:5500, source:"Tiffany markup 200-300% (Beyond4Cs); online retailers ~10% markup" },
      { name:"David Yurman Cable Bracelet", cost:60, retail:395, alt:"CRAFTD London", altUrl:"https://craftdlondon.com", altPrice:50, source:"Sterling silver jewelry COGS ~$40-$80; DY ~70%+ margins" },
      { name:"Pandora Charm Bracelet", cost:8, retail:65, alt:"Amazon charm bracelet", altUrl:"https://www.amazon.com/s?k=Amazon+charm+bracelet", altPrice:12, source:"Pandora ~78% gross margin (SEC); silver charm COGS ~$5-$10" },
      { name:"Cartier Love Bracelet (gold)", cost:800, retail:7600, alt:"Mejuri Gold Vermeil Cuff", altUrl:"https://mejuri.com", altPrice:100, source:"18k gold weight ~28g (~$1,800 melt value); Richemont ~65% gross margin (SEC)" },
      { name:"Swarovski Crystal Necklace", cost:4, retail:120, alt:"Amazon crystal pendant", altUrl:"https://www.amazon.com/s?k=Amazon+crystal+pendant", altPrice:18, source:"Glass crystal + rhodium plating COGS ~$3-$6; Swarovski ~60% margin on fashion jewelry" },
    ]},
    { name:"Wedding", products: [
      { name:"Vera Wang Wedding Dress", cost:400, retail:5000, alt:"BHLDN / David's Bridal", altUrl:"https://bhldn.com", altPrice:800, source:"Bridal industry: 3x markup (Bridal Buyer); fabric + labor ~$300-$600" },
      { name:"Wedding Venue Flowers", cost:80, retail:800, alt:"DIY wholesale (FiftyFlowers)", altUrl:"https://fiftyflowers.com", altPrice:150, source:"Wedding flower markup 400-500% over wholesale" },
      { name:"Wedding Cake (3-Tier)", cost:50, retail:600, alt:"Costco sheet cake + decorate", altUrl:"https://costco.com", altPrice:60, source:"Bakery: 100%+ markup; ingredients ~$40-$60 for 3-tier" },

    ]},
  ]},
  { id:"kids", name:"Kids & Baby", icon:"🍼", subs: [
    { name:"Strollers & Gear", products: [
      { name:"UPPAbaby Vista V3 Stroller", cost:200, retail:1100, alt:"Graco Modes Nest", altUrl:"https://gracobaby.com", altPrice:280, source:"Stroller mfg cost $150-$200 in China; retail 3-5x after distribution (Kido Bébé industry report)" },
      { name:"Doona Car Seat / Stroller", cost:100, retail:550, alt:"Evenflo Shyft", altUrl:"https://evenflo.com", altPrice:200, source:"Integrated car seat/stroller BOM ~$80-$120; premium for convenience" },
      { name:"Ergobaby Omni 360 Carrier", cost:25, retail:180, alt:"Infantino Flip 4-in-1", altUrl:"https://infantino.com", altPrice:30, source:"Baby carrier fabric + buckles COGS ~$15-$30; Ergobaby ~70% margins" },
      { name:"Bugaboo Fox 5 Stroller", cost:250, retail:1400, alt:"Baby Jogger City Mini GT2", altUrl:"https://babyjogger.com", altPrice:350, source:"Premium stroller BOM est. $200-$300; Bugaboo ~70% brand premium" },
      { name:"Snoo Smart Bassinet", cost:150, retail:1695, alt:"Graco Sense2Snooze", altUrl:"https://gracobaby.com", altPrice:200, source:"Motor + sensors + frame est. $100-$180; Happiest Baby premium for tech + brand" },
    ]},
    { name:"Feeding", products: [
      { name:"Similac Pro-Advance (30.8oz)", cost:6, retail:38, alt:"Kirkland Infant Formula", altUrl:"https://costco.com", altPrice:18, source:"Formula mfg $3-$8/can (GAO); Abbott ~55% gross margin; store brands identical nutrition" },
      { name:"Enfamil NeuroPro (20.7oz)", cost:5, retail:35, alt:"Parent's Choice (Walmart)", altUrl:"https://walmart.com", altPrice:14, source:"Reckitt (Enfamil parent) ~60% gross margin; ingredients cost ~$3-$6/can" },
      { name:"Philips Avent Natural Bottles (3pk)", cost:4, retail:22, alt:"Amazon Basics bottles (3pk)", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+bottles+3pk", altPrice:8, source:"BPA-free plastic bottles COGS ~$1-$2 each; brand premium 3-4x" },
      { name:"Boon Grass Drying Rack", cost:3, retail:18, alt:"Amazon Basics drying rack", altUrl:"https://www.amazon.com/s?k=Amazon+Basics+drying+rack", altPrice:6, source:"Plastic countertop accessory COGS ~$2-$4; baby brand premium 3-5x" },
      { name:"Baby Brezza Formula Pro", cost:30, retail:200, alt:"Dr. Brown's pitcher + formula", altUrl:"https://www.amazon.com/s?k=Dr.+Browns+pitcher+++formula", altPrice:25, source:"Small appliance BOM ~$25-$40; convenience premium for automated mixing" },
    ]},
    { name:"Diapers & Essentials", products: [
      { name:"Pampers Swaddlers (84ct)", cost:5, retail:28, alt:"Costco Kirkland Diapers", altUrl:"https://costco.com", altPrice:14, source:"P&G Baby Care ~55% gross margin; diaper COGS ~$0.04-$0.07 each" },
      { name:"Huggies Little Snugglers (72ct)", cost:4, retail:25, alt:"Amazon Mama Bear", altUrl:"https://www.amazon.com/s?k=Amazon+Mama+Bear", altPrice:12, source:"Kimberly-Clark ~35% gross margin; SAP + nonwoven fabric ~$0.05/diaper" },
      { name:"Water Wipes 60ct (12pk)", cost:6, retail:40, alt:"Amazon Elements wipes", altUrl:"https://www.amazon.com/s?k=Amazon+Elements+wipes", altPrice:18, source:"Water + grapefruit extract on nonwoven ~$0.01/wipe; premium baby care 3-4x markup" },
      { name:"Owlet Smart Sock Monitor", cost:50, retail:300, alt:"Eufy SpaceView Monitor", altUrl:"https://www.amazon.com/s?k=Eufy+SpaceView+Monitor", altPrice:65, source:"Pulse oximeter sensor + BLE module BOM ~$30-$60; Owlet premium for health-tech" },
    ]},
    { name:"Toys & Learning", products: [
      { name:"LEGO Classic 1500pc Set", cost:15, retail:70, alt:"MEGA Bloks 480pc Tub", altUrl:"https://www.amazon.com/s?k=MEGA+Bloks+480pc+Tub", altPrice:30, source:"LEGO ~68% gross margin (Statista); injection molding cost ~$0.07-$0.10/piece" },
      { name:"Magna-Tiles 100pc Set", cost:15, retail:120, alt:"PicassoTiles 100pc", altUrl:"https://www.amazon.com/s?k=PicassoTiles+100pc", altPrice:40, source:"Magnetic tile COGS ~$0.10-$0.15 each; Magna-Tiles brand premium 3-4x" },
      { name:"Fisher-Price Laugh & Learn", cost:5, retail:35, alt:"VTech equivalent", altUrl:"https://vtechkids.com", altPrice:15, source:"Electronic toy BOM ~$3-$6; Mattel ~48% gross margin (SEC)" },
      { name:"Baby Einstein Discovery Gym", cost:8, retail:50, alt:"Infantino Activity Gym", altUrl:"https://www.amazon.com/s?k=Infantino+Activity+Gym", altPrice:22, source:"Fabric gym + plastic toys COGS ~$5-$10; Kids2 ~60% margins" },
      { name:"Lovevery Play Kit (quarterly)", cost:15, retail:80, alt:"Amazon Montessori toy set", altUrl:"https://www.amazon.com/s?k=Amazon+Montessori+toy+set", altPrice:25, source:"Wooden/fabric toys COGS ~$10-$18; Lovevery charges DTC subscription premium" },
      { name:"Sophie la Girafe Teether", cost:1.50, retail:25, alt:"Nuby teething keys", altUrl:"https://www.amazon.com/s?k=Nuby+teething+keys", altPrice:5, source:"Natural rubber teether COGS ~$1-$2; French brand heritage premium 10x+" },
    ]},
  ]},
];

function mp(c, r) { return Math.round(((r - c) / c) * 100); }
function mc(p) { return p >= 1000 ? "#e11d48" : p >= 500 ? "#f97316" : p >= 200 ? "#eab308" : "#22c55e"; }
function ml(p) { return p >= 1000 ? "EXTREME" : p >= 500 ? "HIGH" : p >= 200 ? "MODERATE" : "LOW"; }

function ProductCard({ product }) {
  const [src, setSrc] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const pct = mp(product.cost, product.retail);
  const bw = Math.max((product.cost / product.retail) * 100, 4);
  return (
    <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:14, transition:"all 0.3s" }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="#cbd5e1";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.08)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
      <div style={{ position:"relative", height:140, overflow:"hidden", borderRadius:"14px 14px 0 0" }}>
        {product.imageUrl && !imgErr ? (
          <img src={product.imageUrl} alt={product.name} onError={()=>setImgErr(true)}
            style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        ) : getIll(product.name)}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:40, background:"linear-gradient(transparent,#f8fafc)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:8, right:8, background:mc(pct), color:"#fff", fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, padding:"3px 8px", borderRadius:6, boxShadow:"0 2px 8px rgba(0,0,0,0.4)" }}>{pct.toLocaleString()}%</div>
      </div>
      <div style={{ padding:"8px 14px 14px" }}>
        <h3 style={{ margin:"0 0 1px", color:"#1e293b", fontSize:14, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, lineHeight:1.3 }}>{product.name}</h3>
        <span style={{ fontSize:8, fontWeight:700, letterSpacing:1.5, color:mc(pct) }}>{ml(pct)} MARKUP</span>
        <div style={{ display:"flex", alignItems:"center", gap:8, margin:"8px 0" }}>
          <div><div style={{ fontSize:8, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>COST</div><div style={{ fontSize:16, fontWeight:700, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace" }}>${product.cost < 1 ? product.cost.toFixed(2) : product.cost.toLocaleString()}</div></div>
          <div style={{ flex:1 }}><div style={{ height:4, background:"#e2e8f0", borderRadius:2, overflow:"hidden", display:"flex" }}><div style={{ width:`${bw}%`, background:"#22c55e", borderRadius:"2px 0 0 2px" }} /><div style={{ width:`${100-bw}%`, background:mc(pct), opacity:0.35, borderRadius:"0 2px 2px 0" }} /></div></div>
          <div style={{ textAlign:"right" }}><div style={{ fontSize:8, color:"#f87171", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>RETAIL</div><div style={{ fontSize:16, fontWeight:700, color:"#f87171", fontFamily:"'JetBrains Mono',monospace" }}>${product.retail < 1 ? product.retail.toFixed(2) : product.retail.toLocaleString()}</div></div>
        </div>
        {/* ALTERNATIVE - REDESIGNED */}
        <div style={{ background:"#e2e8f0", borderRadius:8, padding:"10px 12px", position:"relative" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontSize:7, fontWeight:700, letterSpacing:1.5, color:"#3b82f6", marginBottom:2 }}>SMARTER PICK</div>
              <a href={product.altUrl} target="_blank" rel="noopener noreferrer" style={{ color:"#1e293b", fontSize:15, fontWeight:600, textDecoration:"none", lineHeight:1.3, display:"block" }}
                onMouseEnter={e=>e.currentTarget.style.color="#3b82f6"}
                onMouseLeave={e=>e.currentTarget.style.color="#1e293b"}>{product.alt} →</a>
              {product.altPrice >= 0 && (product.retail - product.altPrice) > 0 && (
                <div style={{ fontSize:10, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace", marginTop:3 }}>You save ${Math.round(product.retail - product.altPrice).toLocaleString()}</div>
              )}
            </div>
            {product.altPrice > 0 && (
              <div style={{ textAlign:"right", flexShrink:0, marginLeft:10 }}>
                <div style={{ fontSize:7, fontWeight:700, letterSpacing:1, color:"#22c55e", marginBottom:1 }}>STARTING AT</div>
                <div style={{ fontSize:20, fontWeight:700, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace", lineHeight:1 }}>${product.altPrice < 1 ? product.altPrice.toFixed(2) : product.altPrice.toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>
        {product.source && <><button onClick={()=>setSrc(!src)} style={{ background:"none", border:"none", color:"#94a3b8", fontSize:9, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", padding:"5px 0 0" }}>{src?"▾ Hide":"▸ Source"}</button>{src && <div style={{ marginTop:3, fontSize:9, color:"#94a3b8", lineHeight:1.5, padding:"5px 7px", background:"#f1f5f9", borderRadius:5, border:"1px solid #e2e8f0" }}>{product.source}</div>}</>}
      </div>
    </div>
  );
}

function sortP(p, s) {
  if (s === "default") return p;
  const a = [...p];
  switch(s) {
    case "markup-high": return a.sort((x,y)=>mp(y.cost,y.retail)-mp(x.cost,x.retail));
    case "markup-low": return a.sort((x,y)=>mp(x.cost,x.retail)-mp(y.cost,y.retail));
    case "price-high": return a.sort((x,y)=>y.retail-x.retail);
    case "price-low": return a.sort((x,y)=>x.retail-y.retail);
    default: return a;
  }
}

export default function MarkupRevealed() {
  const [activeCat, setActiveCat] = useState("fashion");
  const [activeView, setActiveView] = useState(null); // "analyzed", "trending", or null for normal categories
  const [activeSub, setActiveSub] = useState(null);
  const [search, setSearch] = useState("");
  const [pasteUrl, setPasteUrl] = useState("");
  const [sort, setSort] = useState("default");
  const [modal, setModal] = useState(null); // { loading, error, product }
  const [modalVisible, setModalVisible] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [communityProducts, setCommunityProducts] = useState([]);

  // Load saved products from persistent storage (personal + shared community)
  useState(() => {
    (async () => {
      try {
        const result = await fetch("/api/storage?key=user-analyzed-products").then(r=>r.json());
        if (result && result.value) setUserProducts(JSON.parse(result.value));
      } catch (e) {}
      try {
        const shared = await fetch("/api/storage?key=community-products&shared=true").then(r=>r.json());
        if (shared && shared.value) setCommunityProducts(JSON.parse(shared.value));
      } catch (e) {}
      setStorageLoaded(true);
    })();
  });

  const saveUserProduct = async (product, url) => {
    const entry = { ...product, analyzedUrl: url, analyzedAt: Date.now(), id: Date.now().toString() };
    // Save to personal
    const updated = [entry, ...userProducts.filter(p => p.analyzedUrl !== url)].slice(0, 50);
    setUserProducts(updated);
    try { await fetch("/api/storage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:"user-analyzed-products",value:JSON.stringify(updated)})}); } catch (e) {}
    // Also save to shared community database (dedup by URL, keep last 500)
    try {
      let community = [];
      try {
        const shared = await fetch("/api/storage?key=community-products&shared=true").then(r=>r.json());
        if (shared && shared.value) community = JSON.parse(shared.value);
      } catch (e) {}
      const communityUpdated = [entry, ...community.filter(p => p.analyzedUrl !== url)].slice(0, 500);
      await fetch("/api/storage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:"community-products",value:JSON.stringify(communityUpdated),shared:true})});
      setCommunityProducts(communityUpdated);
    } catch (e) {}
    return entry;
  };

  const removeUserProduct = async (id) => {
    const updated = userProducts.filter(p => p.id !== id);
    setUserProducts(updated);
    try { await fetch("/api/storage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:"user-analyzed-products",value:JSON.stringify(updated)})}); } catch (e) {}
  };

  const clearAllUserProducts = async () => {
    setUserProducts([]);
    try { await fetch("/api/storage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:"user-analyzed-products",value:"[]"})}); } catch (e) {}
  };

  const cat = CATEGORIES.find(c => c.id === activeCat);
  const builtInProducts = useMemo(() => CATEGORIES.flatMap(c => c.subs.flatMap(s => s.products)), []);
  // Merge all sources: built-in + personal + community (deduplicated)
  const allProducts = useMemo(() => {
    const seen = new Set();
    const merged = [];
    // Built-in first
    builtInProducts.forEach(p => { seen.add(p.name); merged.push(p); });
    // Personal analyzed
    userProducts.forEach(p => { if (!seen.has(p.name)) { seen.add(p.name); merged.push(p); }});
    // Community shared
    communityProducts.forEach(p => { if (!seen.has(p.name)) { seen.add(p.name); merged.push(p); }});
    return merged;
  }, [builtInProducts, userProducts, communityProducts]);
  const trendingProducts = useMemo(() => [...allProducts].sort((a, b) => mp(b.cost, b.retail) - mp(a.cost, a.retail)).slice(0, 20), [allProducts]);

  const analyzeUrl = async (url) => {
    if (!url || url.length < 5) return;
    setModal({ loading: true, progress: "fetching" });
    setModalVisible(true);

    // Extract keywords from URL for fallback
    const cleaned = url.replace(/https?:\/\//, "").replace(/www\./, "");
    const domain = cleaned.split("/")[0].split(".")[0].toLowerCase();
    const pathWords = cleaned.split("?")[0].replace(/[\/\-_\.=&%+]/g, " ").toLowerCase()
      .replace(/com|org|net|html|php|asp|www|http|products?|shop|collections?|pages?|item|dp|ref|gp|category|browse|detail/g, " ")
      .trim().split(/\s+/).filter(w => w.length > 2);
    const allKeywords = [...new Set([domain, ...pathWords])].filter(w => w.length > 2);

    // STEP 1: Check community cache first — exact URL match (free, instant)
    const normalizedUrl = url.replace(/https?:\/\//, "").replace(/www\./, "").replace(/\/$/, "").toLowerCase();
    const cachedExact = communityProducts.find(p => p.analyzedUrl && p.analyzedUrl.replace(/https?:\/\//, "").replace(/www\./, "").replace(/\/$/, "").toLowerCase() === normalizedUrl);
    if (cachedExact) {
      setModal({ loading: false, product: cachedExact, cached: true });
      return;
    }

    // STEP 2: Check community + built-in DB for strong keyword match (free, instant)
    const dbMatches = allProducts
      .map(p => {
        const pn = (p.name + " " + (p.brand || "")).toLowerCase();
        let score = 0;
        if (domain.length > 3 && pn.includes(domain)) score += 10;
        allKeywords.forEach(kw => { if (kw.length > 3 && pn.includes(kw)) score += 3; });
        return { product: p, score };
      })
      .filter(s => s.score >= 8)
      .sort((a, b) => b.score - a.score);

    if (dbMatches.length > 0) {
      const best = dbMatches[0].product;
      const product = { name: best.name, brand: best.brand || best.name.split(" ")[0], retail: best.retail, cost: best.cost, source: best.source, alt: best.alt, altPrice: best.altPrice, altUrl: best.altUrl };
      await saveUserProduct(product, url);
      setModal({ loading: false, product, cached: true });
      return;
    }

    // STEP 3: No cache hit — call the API (costs 1 API call)
    const progressTimer1 = setTimeout(() => setModal(m => m?.loading ? { ...m, progress: "searching" } : m), 1200);
    const progressTimer2 = setTimeout(() => setModal(m => m?.loading ? { ...m, progress: "estimating" } : m), 3000);
    const progressTimer3 = setTimeout(() => setModal(m => m?.loading ? { ...m, progress: "finding" } : m), 5000);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content: `Analyze this product URL and estimate its markup: ${url}

Respond ONLY with a JSON object, no markdown backticks, no preamble:
{
  "name": "Full product name with brand",
  "brand": "Brand name",
  "retail": retail price as a number,
  "cost": estimated manufacturing/production cost as a number,
  "source": "Brief explanation of cost estimate citing industry margins, SEC filings, or teardowns",
  "alt": "Name of a more affordable alternative",
  "altPrice": alternative price as a number,
  "altUrl": "URL to buy the alternative",
  "imageUrl": "Direct URL to a product image (from the retailer site, CDN, or press kit — must be a .jpg, .png, or .webp URL)",
  "altImageUrl": "Direct URL to an image of the alternative product"
}

Use web search to find the actual retail price and a product image URL. Estimate manufacturing cost using the brand's reported gross margins or industry benchmarks. Be specific and realistic.` }]
        })
      });
      clearTimeout(progressTimer1); clearTimeout(progressTimer2); clearTimeout(progressTimer3);
      if (!response.ok) throw new Error("API " + response.status);
      setModal(m => ({ ...m, progress: "finding" }));
      const data = await response.json();
      const text = data.content.map(i => i.type === "text" ? i.text : "").filter(Boolean).join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      const jsonMatch = clean.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON");
      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.name || !parsed.retail || !parsed.cost) throw new Error("Incomplete");
      await saveUserProduct(parsed, url);
      setModal({ loading: false, product: parsed });
    } catch (err) {
      clearTimeout(progressTimer1); clearTimeout(progressTimer2); clearTimeout(progressTimer3);
      // API failed — try weaker keyword match from local database
      setModal(m => ({ ...m, progress: "estimating" }));
      const weakMatches = allProducts
        .map(p => {
          const pn = p.name.toLowerCase();
          let score = 0;
          if (domain.length > 3 && pn.includes(domain)) score += 10;
          allKeywords.forEach(kw => { if (kw.length > 3 && pn.includes(kw)) score += 3; });
          return { product: p, score };
        })
        .filter(s => s.score >= 5)
        .sort((a, b) => b.score - a.score);

      if (weakMatches.length > 0) {
        const best = weakMatches[0].product;
        const product = { name: best.name, brand: best.name.split(" ")[0], retail: best.retail, cost: best.cost, source: best.source, alt: best.alt, altPrice: best.altPrice, altUrl: best.altUrl };
        await saveUserProduct(product, url);
        setModal({ loading: false, product });
      } else {
        setModal({ loading: false, error: `Could not analyze this product. Try pasting a direct product link from a retailer (e.g. nike.com/air-force-1, apple.com/airpods-pro).` });
      }
    }
  };

  const handlePasteInput = (val) => {
    setPasteUrl(val);
    // Auto-trigger when a URL is pasted (contains http or www or .com)
    if (val.includes("http") || val.includes("www.") || val.includes(".com")) {
      // Small debounce to let paste complete
      clearTimeout(window._pasteTimer);
      window._pasteTimer = setTimeout(() => analyzeUrl(val), 150);
    }
  };

  const filtered = search ? allProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.alt.toLowerCase().includes(search.toLowerCase())) : null;

  let displayProducts;
  if (filtered) {
    displayProducts = sortP(filtered, sort);
  } else if (activeView === "trending") {
    displayProducts = sortP(trendingProducts, sort);
  } else if (activeView === "analyzed") {
    displayProducts = sortP(userProducts, sort);
  } else if (activeView === "community") {
    displayProducts = sortP(communityProducts, sort);
  } else if (activeSub !== null) {
    displayProducts = sortP(cat.subs[activeSub].products, sort);
  } else {
    displayProducts = sortP(cat.subs.flatMap(s => s.products), sort);
  }

  return (
    <div style={{ minHeight:"100vh", background:"#ffffff", color:"#94a3b8", fontFamily:"'Space Grotesk',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:#3b82f6;color:#ffffff}
      `}</style>

      {/* HEADER */}
      <header style={{ padding:"36px 20px 28px", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%,#3b82f608 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#e11d4812", border:"1px solid #e11d4822", borderRadius:20, padding:"3px 12px", fontSize:9, fontWeight:600, letterSpacing:1.5, color:"#fb7185", marginBottom:12, animation:"pulse 3s infinite" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#e11d48" }} />EXPOSING BRAND MARKUPS
          </div>
          <h1 style={{ fontSize:"clamp(28px,5vw,44px)", fontWeight:700, letterSpacing:-1.5, lineHeight:1.1, color:"#0f172a", marginBottom:6 }}>Markup<span style={{ color:"#e11d48" }}>Revealed</span></h1>
          <p style={{ fontSize:13, color:"#94a3b8", maxWidth:400, margin:"0 auto 18px", lineHeight:1.5 }}>What brands charge vs. what products cost to make.</p>
          <div style={{ display:"flex", justifyContent:"center", maxWidth:420, margin:"0 auto" }}>
            <div style={{ position:"relative", width:"100%" }}>
              <input type="text" placeholder="Paste product link here to reveal markup..." value={pasteUrl} onChange={e=>handlePasteInput(e.target.value)}
                style={{ width:"100%", padding:"10px 14px 10px 36px", background:"#f8fafc", border:"1px solid #3b82f644", borderRadius:12, color:"#1e293b", fontSize:12, fontFamily:"'Space Grotesk',sans-serif", outline:"none", transition:"border-color 0.2s" }}
                onFocus={e=>e.currentTarget.style.borderColor="#3b82f6"} onBlur={e=>e.currentTarget.style.borderColor="#3b82f644"} />
              <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, pointerEvents:"none" }}>🔗</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN - Sidebar + Content Layout */}
      <main style={{ maxWidth:1280, margin:"0 auto", padding:"0 16px 40px", display:"flex", gap:20 }}>

        {/* LEFT SIDEBAR - Categories */}
        {!filtered && (
          <nav style={{ width:220, flexShrink:0, position:"sticky", top:16, alignSelf:"flex-start" }}>
            {/* Special views */}
            <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden", marginBottom:8 }}>
              <button onClick={()=>{setActiveView("analyzed");setActiveSub(null);}} style={{
                display:"flex", alignItems:"center", gap:8, width:"100%", padding:"10px 14px",
                border:"none", borderBottom:"1px solid #e2e8f0",
                background:activeView==="analyzed"?"#3b82f608":"transparent",
                color:activeView==="analyzed"?"#3b82f6":"#64748b", cursor:"pointer",
                fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:activeView==="analyzed"?600:400,
                textAlign:"left", transition:"all 0.15s",
              }}
                onMouseEnter={e=>{if(activeView!=="analyzed"){e.currentTarget.style.background="#f1f5f9";e.currentTarget.style.color="#334155";}}}
                onMouseLeave={e=>{e.currentTarget.style.background=activeView==="analyzed"?"#3b82f608":"transparent";e.currentTarget.style.color=activeView==="analyzed"?"#3b82f6":"#64748b";}}>
                <span style={{ fontSize:15 }}>📋</span>
                <span style={{ flex:1 }}>Your Analyzed</span>
                <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:activeView==="analyzed"?"#3b82f6":"#94a3b8" }}>{userProducts.length}</span>
              </button>
              <button onClick={()=>{setActiveView("trending");setActiveSub(null);}} style={{
                display:"flex", alignItems:"center", gap:8, width:"100%", padding:"10px 14px",
                border:"none",
                background:activeView==="trending"?"#3b82f608":"transparent",
                color:activeView==="trending"?"#3b82f6":"#64748b", cursor:"pointer",
                fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:activeView==="trending"?600:400,
                textAlign:"left", transition:"all 0.15s",
              }}
                onMouseEnter={e=>{if(activeView!=="trending"){e.currentTarget.style.background="#f1f5f9";e.currentTarget.style.color="#334155";}}}
                onMouseLeave={e=>{e.currentTarget.style.background=activeView==="trending"?"#3b82f608":"transparent";e.currentTarget.style.color=activeView==="trending"?"#3b82f6":"#64748b";}}>
                <span style={{ fontSize:15 }}>🔥</span>
                <span style={{ flex:1 }}>Top Trending</span>
                <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:activeView==="trending"?"#3b82f6":"#94a3b8" }}>20</span>
              </button>
              <button onClick={()=>{setActiveView("community");setActiveSub(null);}} style={{
                display:"flex", alignItems:"center", gap:8, width:"100%", padding:"10px 14px",
                border:"none",
                background:activeView==="community"?"#3b82f608":"transparent",
                color:activeView==="community"?"#3b82f6":"#64748b", cursor:"pointer",
                fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:activeView==="community"?600:400,
                textAlign:"left", transition:"all 0.15s",
              }}
                onMouseEnter={e=>{if(activeView!=="community"){e.currentTarget.style.background="#f1f5f9";e.currentTarget.style.color="#334155";}}}
                onMouseLeave={e=>{e.currentTarget.style.background=activeView==="community"?"#3b82f608":"transparent";e.currentTarget.style.color=activeView==="community"?"#3b82f6":"#64748b";}}>
                <span style={{ fontSize:15 }}>🌐</span>
                <span style={{ flex:1 }}>Community Added</span>
                <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:activeView==="community"?"#3b82f6":"#94a3b8" }}>{communityProducts.length}</span>
              </button>
            </div>

            {/* Category list */}
            <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
              {CATEGORIES.map(c => {
                const cnt = c.subs.reduce((a,s)=>a+s.products.length,0);
                const isOpen = c.id === activeCat && !activeView;
                return (
                  <div key={c.id}>
                    <button onClick={()=>{setActiveCat(c.id);setActiveSub(null);setActiveView(null);}} style={{
                      display:"flex", alignItems:"center", gap:8, width:"100%", padding:"10px 14px",
                      border:"none", borderBottom:"1px solid #e2e8f0",
                      background:isOpen?"#3b82f608":"transparent",
                      color:isOpen?"#3b82f6":"#94a3b8", cursor:"pointer",
                      fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:isOpen?600:400,
                      textAlign:"left", transition:"all 0.15s",
                    }}
                      onMouseEnter={e=>{if(!isOpen)e.currentTarget.style.background="#f1f5f9";e.currentTarget.style.color=isOpen?"#3b82f6":"#334155";}}
                      onMouseLeave={e=>{e.currentTarget.style.background=isOpen?"#3b82f608":"transparent";e.currentTarget.style.color=isOpen?"#3b82f6":"#94a3b8";}}>
                      <span style={{ fontSize:15 }}>{c.icon}</span>
                      <span style={{ flex:1 }}>{c.name}</span>
                      <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", color:isOpen?"#3b82f6":"#475569" }}>{cnt}</span>
                      <span style={{ fontSize:10, color:isOpen?"#3b82f6":"#475569", transition:"transform 0.2s", transform:isOpen?"rotate(90deg)":"rotate(0deg)" }}>▸</span>
                    </button>
                    {/* Subcategories - expand when active */}
                    {isOpen && (
                      <div style={{ background:"#f1f5f9", borderBottom:"1px solid #e2e8f0" }}>
                        <button onClick={()=>setActiveSub(null)} style={{
                          display:"block", width:"100%", padding:"7px 14px 7px 38px", border:"none",
                          background:activeSub===null?"#3b82f60a":"transparent",
                          color:activeSub===null?"#3b82f6":"#64748b", cursor:"pointer",
                          fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:activeSub===null?600:400,
                          textAlign:"left", transition:"color 0.15s",
                        }}
                          onMouseEnter={e=>e.currentTarget.style.color=activeSub===null?"#3b82f6":"#334155"}
                          onMouseLeave={e=>e.currentTarget.style.color=activeSub===null?"#3b82f6":"#64748b"}>
                          All ({cnt})
                        </button>
                        {c.subs.map((s,i) => (
                          <button key={i} onClick={()=>setActiveSub(i)} style={{
                            display:"block", width:"100%", padding:"7px 14px 7px 38px", border:"none",
                            background:activeSub===i?"#3b82f60a":"transparent",
                            color:activeSub===i?"#3b82f6":"#64748b", cursor:"pointer",
                            fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:activeSub===i?600:400,
                            textAlign:"left", transition:"color 0.15s",
                          }}
                            onMouseEnter={e=>e.currentTarget.style.color=activeSub===i?"#3b82f6":"#334155"}
                            onMouseLeave={e=>e.currentTarget.style.color=activeSub===i?"#3b82f6":"#64748b"}>
                            {s.name} <span style={{ fontSize:9, fontFamily:"'JetBrains Mono',monospace", opacity:0.6 }}>({s.products.length})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        )}

        {/* RIGHT CONTENT */}
        <div style={{ flex:1, minWidth:0 }}>
          {/* SEARCH/SORT */}
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ position:"relative", flex:1, minWidth:160 }}>
                <input type="text" placeholder="Search 200 products..." value={search} onChange={e=>setSearch(e.target.value)}
                  style={{ width:"100%", padding:"9px 12px 9px 34px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10, color:"#1e293b", fontSize:12, fontFamily:"'Space Grotesk',sans-serif", outline:"none" }}
                  onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
                <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13, color:"#94a3b8", pointerEvents:"none" }}>🔍</span>
              </div>
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{ padding:"9px 24px 9px 10px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10, color:"#94a3b8", fontSize:11, fontFamily:"'Space Grotesk',sans-serif", cursor:"pointer", outline:"none", appearance:"none" }}>
                <option value="default">Default</option>
                <option value="markup-high">Highest markup</option>
                <option value="markup-low">Lowest markup</option>
                <option value="price-high">Most expensive</option>
                <option value="price-low">Cheapest</option>
              </select>
            </div>
          </div>

          {/* Content title */}
          {!filtered && (
            <div style={{ marginBottom:12 }}>
              {activeView === "analyzed" ? (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:18, fontWeight:700, color:"#0f172a", margin:0 }}>📋 Your Analyzed Products</h2>
                    {userProducts.length > 0 && <button onClick={clearAllUserProducts} style={{ padding:"5px 12px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, color:"#94a3b8", fontSize:10, cursor:"pointer", fontFamily:"'Space Grotesk',sans-serif" }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="#e11d48";e.currentTarget.style.color="#e11d48";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="#e2e8f0";e.currentTarget.style.color="#94a3b8";}}>Clear All</button>}
                  </div>
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{userProducts.length} product{userProducts.length!==1?"s":""} analyzed · saved across sessions</div>
                  {userProducts.length === 0 && <div style={{ textAlign:"center", padding:48, color:"#94a3b8" }}><div style={{ fontSize:36, marginBottom:8 }}>📋</div><div style={{ fontSize:13 }}>No products analyzed yet.</div><div style={{ fontSize:11, marginTop:4 }}>Paste a product link above to get started.</div></div>}
                </>
              ) : activeView === "trending" ? (
                <>
                  <h2 style={{ fontSize:18, fontWeight:700, color:"#0f172a", margin:0 }}>🔥 Top Trending</h2>
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>The 20 highest markup products across all categories</div>
                </>
              ) : activeView === "community" ? (
                <>
                  <h2 style={{ fontSize:18, fontWeight:700, color:"#0f172a", margin:0 }}>🌐 Community Added</h2>
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{communityProducts.length} product{communityProducts.length!==1?"s":""} added by users · shared database grows with every paste</div>
                  {communityProducts.length === 0 && <div style={{ textAlign:"center", padding:48, color:"#94a3b8" }}><div style={{ fontSize:36, marginBottom:8 }}>🌐</div><div style={{ fontSize:13 }}>No community products yet.</div><div style={{ fontSize:11, marginTop:4 }}>Be the first — paste a product link above!</div></div>}
                </>
              ) : cat ? (
                <>
                  <h2 style={{ fontSize:18, fontWeight:700, color:"#0f172a", margin:0 }}>
                    {cat.icon} {cat.name}
                    {activeSub !== null && cat.subs[activeSub] && <span style={{ color:"#94a3b8", fontWeight:400 }}> / {cat.subs[activeSub].name}</span>}
                  </h2>
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{displayProducts.length} product{displayProducts.length!==1?"s":""}</div>
                </>
              ) : null}
            </div>
          )}

          {/* SEARCH INFO */}
          {filtered && (
            <div style={{ marginBottom:12, fontSize:11, color:"#94a3b8" }}>
              {filtered.length} result{filtered.length!==1?"s":""} for "<span style={{ color:"#3b82f6" }}>{search}</span>"
              <button onClick={()=>setSearch("")} style={{ marginLeft:8, padding:"2px 7px", background:"#e2e8f0", border:"none", borderRadius:4, color:"#94a3b8", fontSize:9, cursor:"pointer" }}>Clear</button>
            </div>
          )}

          {/* GRID */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14, animation:"fadeUp 0.4s ease" }}>
            {displayProducts.map((p,i)=><ProductCard key={`${activeCat}-${activeSub}-${sort}-${i}`} product={p} />)}
          </div>

          {filtered && filtered.length===0 && <div style={{ textAlign:"center", padding:36, color:"#94a3b8" }}><div style={{ fontSize:28, marginBottom:6 }}>🔍</div>No results found.</div>}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid #e2e8f0", padding:"28px 16px 20px" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <h3 style={{ fontSize:12, fontWeight:600, color:"#94a3b8", marginBottom:10, textAlign:"center" }}>How We Source Our Data</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:8, marginBottom:14 }}>
            {[{i:"📊",t:"SEC Filings",d:"Public gross margins from 10-K reports"},{i:"🔬",t:"Teardowns",d:"BOM from Omdia & TechInsights"},{i:"🏭",t:"Journalism",d:"CBS, Freakonomics, WSJ, LA Times"},{i:"📦",t:"Wholesale",d:"Factory-direct pricing & Alibaba data"}].map((x,j)=>(
              <div key={j} style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, padding:8, textAlign:"center" }}>
                <div style={{ fontSize:14, marginBottom:2 }}>{x.i}</div>
                <div style={{ fontSize:9, fontWeight:600, color:"#cbd5e1" }}>{x.t}</div>
                <div style={{ fontSize:8, color:"#94a3b8", lineHeight:1.4, marginTop:1 }}>{x.d}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize:9, color:"#94a3b8", textAlign:"center", lineHeight:1.6, maxWidth:480, margin:"0 auto" }}>
            "Cost to make" = estimated manufacturing cost. Does not include R&D, marketing, or distribution. Click "Source" on any card for details.
          </p>
          <p style={{ fontSize:9, color:"#94a3b8", marginTop:8, textAlign:"center" }}>© 2026 MarkupRevealed · {allProducts.length} products tracked{communityProducts.length > 0 ? ` · ${communityProducts.length} community added` : ""}</p>
        </div>
      </footer>

      {/* MARKUP REVEAL MODAL */}
      {modalVisible && modal && (
        <div style={{ position:"fixed", inset:0, zIndex:10000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={()=>{setModalVisible(false);setModal(null);setPasteUrl("");}}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(8px)" }} />
          <div style={{ position:"relative", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:18, padding:0, maxWidth:520, width:"100%", boxShadow:"0 24px 80px rgba(0,0,0,0.15)", animation:"fadeUp 0.3s ease", overflow:"hidden" }} onClick={e=>e.stopPropagation()}>

            {/* Modal Header */}
            <div style={{ padding:"20px 24px 14px", borderBottom:"1px solid #e2e8f0" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <span style={{ fontSize:20, fontWeight:700, color:"#0f172a" }}>Markup</span><span style={{ fontSize:20, fontWeight:700, color:"#e11d48" }}>Revealed</span>
                </div>
                <button onClick={()=>{setModalVisible(false);setModal(null);setPasteUrl("");}} style={{ background:"#e2e8f0", border:"none", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#94a3b8", fontSize:16 }}>✕</button>
              </div>
            </div>

            {/* Loading State */}
            {modal.loading && (
              <div style={{ padding:"40px 24px 44px" }}>
                {/* Progress bar */}
                <div style={{ height:6, background:"#e2e8f0", borderRadius:3, overflow:"hidden", marginBottom:18 }}>
                  <div style={{
                    height:"100%", borderRadius:3,
                    background:"linear-gradient(90deg, #3b82f6, #e11d48)",
                    width: modal.progress === "searching" ? "30%" : modal.progress === "estimating" ? "65%" : modal.progress === "finding" ? "90%" : "15%",
                    transition:"width 0.5s ease",
                  }} />
                </div>
                {/* Step indicators */}
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
                  {[
                    { key:"fetching", label:"Fetching page", icon:"🌐" },
                    { key:"searching", label:"Finding price", icon:"💰" },
                    { key:"estimating", label:"Estimating cost", icon:"🏭" },
                    { key:"finding", label:"Finding alternative", icon:"✨" },
                  ].map((step, i) => {
                    const steps = ["fetching","searching","estimating","finding"];
                    const current = steps.indexOf(modal.progress || "fetching");
                    const isActive = i <= current;
                    const isCurrent = i === current;
                    return (
                      <div key={step.key} style={{ textAlign:"center", flex:1 }}>
                        <div style={{ fontSize:18, marginBottom:3, opacity: isActive ? 1 : 0.3, transition:"opacity 0.3s", transform: isCurrent ? "scale(1.2)" : "scale(1)", display:"inline-block" }}>{step.icon}</div>
                        <div style={{ fontSize:8, color: isActive ? "#3b82f6" : "#475569", fontWeight: isCurrent ? 700 : 500, letterSpacing:0.5, transition:"color 0.3s" }}>{step.label}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize:14, color:"#94a3b8", fontWeight:500, textAlign:"center" }}>
                  {modal.progress === "searching" ? "Identifying retail price..." : modal.progress === "estimating" ? "Calculating manufacturing cost..." : modal.progress === "finding" ? "Finding smarter alternative..." : "Analyzing product page..."}
                </div>
              </div>
            )}

            {/* Error State */}
            {modal.error && (
              <div style={{ padding:"44px 24px", textAlign:"center" }}>
                <div style={{ fontSize:34, marginBottom:10 }}>⚠️</div>
                <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.5 }}>{modal.error}</div>
              </div>
            )}

            {/* Result */}
            {modal.product && (() => {
              const p = modal.product;
              const pct = mp(p.cost, p.retail);
              const bw = Math.max((p.cost / p.retail) * 100, 4);
              const savings = p.altPrice > 0 ? Math.round(p.retail - p.altPrice) : Math.round(p.retail);
              return (
                <>
                  {/* Product Image */}
                  {p.imageUrl && (
                    <div style={{ height:160, overflow:"hidden", background:"#f1f5f9" }}>
                      <img src={p.imageUrl} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.currentTarget.style.display="none"} />
                    </div>
                  )}
                  {/* Product Name & Badge */}
                  <div style={{ padding:"20px 24px 0" }}>
                    {modal.cached && <div style={{ fontSize:9, color:"#22c55e", fontWeight:600, letterSpacing:1, marginBottom:6 }}>⚡ INSTANT — served from community database (no API call)</div>}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                      <div>
                        <h3 style={{ margin:"0 0 3px", color:"#1e293b", fontSize:20, fontWeight:600, lineHeight:1.3 }}>{p.name}</h3>
                        <span style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, color:mc(pct) }}>{ml(pct)} MARKUP</span>
                      </div>
                      <div style={{ background:mc(pct), color:"#fff", fontFamily:"'JetBrains Mono',monospace", fontSize:20, fontWeight:700, padding:"6px 14px", borderRadius:10, boxShadow:"0 2px 8px rgba(0,0,0,0.3)", flexShrink:0 }}>{pct.toLocaleString()}%</div>
                    </div>
                  </div>

                  {/* Cost vs Retail Bar */}
                  <div style={{ padding:"16px 24px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div><div style={{ fontSize:9, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>COST</div><div style={{ fontSize:24, fontWeight:700, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace" }}>${p.cost < 1 ? p.cost.toFixed(2) : p.cost.toLocaleString()}</div></div>
                      <div style={{ flex:1 }}><div style={{ height:8, background:"#e2e8f0", borderRadius:4, overflow:"hidden", display:"flex" }}><div style={{ width:`${bw}%`, background:"#22c55e", borderRadius:"4px 0 0 4px" }} /><div style={{ width:`${100-bw}%`, background:mc(pct), opacity:0.35, borderRadius:"0 4px 4px 0" }} /></div></div>
                      <div style={{ textAlign:"right" }}><div style={{ fontSize:9, color:"#f87171", fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>RETAIL</div><div style={{ fontSize:24, fontWeight:700, color:"#f87171", fontFamily:"'JetBrains Mono',monospace" }}>${p.retail < 1 ? p.retail.toFixed(2) : p.retail.toLocaleString()}</div></div>
                    </div>
                  </div>

                  {/* Source */}
                  {p.source && (
                    <div style={{ padding:"0 24px 14px" }}>
                      <div style={{ fontSize:10, color:"#94a3b8", lineHeight:1.5, padding:"8px 10px", background:"#f1f5f9", borderRadius:6, border:"1px solid #e2e8f0" }}>{p.source}</div>
                    </div>
                  )}

                  {/* Smarter Pick */}
                  <div style={{ padding:"0 24px 22px" }}>
                    <div style={{ background:"#e2e8f0", borderRadius:12, padding:"14px 16px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontSize:9, fontWeight:700, letterSpacing:1.5, color:"#3b82f6", marginBottom:4 }}>SMARTER PICK</div>
                          <a href={p.altUrl} target="_blank" rel="noopener noreferrer" style={{ color:"#1e293b", fontSize:18, fontWeight:600, textDecoration:"none", lineHeight:1.3, display:"block" }}
                            onMouseEnter={e=>e.currentTarget.style.color="#3b82f6"} onMouseLeave={e=>e.currentTarget.style.color="#1e293b"}>{p.alt} →</a>
                          {savings > 0 && (
                            <div style={{ fontSize:12, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace", marginTop:5 }}>You save ${savings.toLocaleString()}</div>
                          )}
                        </div>
                        {p.altPrice > 0 && (
                          <div style={{ textAlign:"right", flexShrink:0, marginLeft:14 }}>
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:1, color:"#22c55e", marginBottom:2 }}>STARTING AT</div>
                            <div style={{ fontSize:26, fontWeight:700, color:"#22c55e", fontFamily:"'JetBrains Mono',monospace", lineHeight:1 }}>${p.altPrice.toLocaleString()}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
