"use strict";

/* ===== EDIT YOUR DATA HERE ===== */
const PROFILE = {
  linkedin: "https://www.linkedin.com/in/dharun-d-316416383/",
  github: "",    // add your GitHub URL when ready
  leetcode: ""   // add your LeetCode URL when ready
};

const PROJECTS = [{
  title: "Intelligent Warehouse Inventory and Asset Tracking System",
  type: "Team Project",
  description: "A team project: we designed a warehouse management system concept to keep inventory records accurate and make assets easier to monitor.",
  details: [
    "Built by our team as a collaborative project.",
    "Focus: tracking inventory and monitoring warehouse assets in one system.",
    "Goal: reduce manual record-keeping and give warehouse staff clearer visibility of stock and equipment."
  ],
  technologies: [],   // e.g. ["Python", "HTML"]; empty shows "Technologies to be updated."
  github: "",         // valid URL only
  demo: ""            // valid URL only
}];

const CERTIFICATES = [
  { title: "SNS Hackathon Certificate", category: "Hackathon", organization: "SNS", image: "assets/certificates/sns-hackathon.jpg" },
  { title: "CHRIST University Bengaluru Hackathon Certificate", category: "Hackathon", organization: "CHRIST University, Bengaluru", image: "assets/certificates/christ-hackathon.jpg" }
];
/* ===== END DATA ===== */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("js");

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}
function validUrl(u) { try { return /^https?:$/.test(new URL(u).protocol); } catch { return false; } }

/* ----- Social links ----- */
const ICONS = {
  LinkedIn: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21h-4v-5.2c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76V21h-4z",
  GitHub: "M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z",
  LeetCode: "M13.5 2.5L4 12l9.5 9.5 2-2L8 12l7.5-7.5zM12 11h9v2h-9z"
};
function renderSocials(box) {
  [["LinkedIn", PROFILE.linkedin], ["GitHub", PROFILE.github], ["LeetCode", PROFILE.leetcode]].forEach(([name, url]) => {
    if (!validUrl(url)) return;
    const a = el("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", name + " profile");
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[name] + '"/></svg>';
    a.append(name);
    box.append(a);
  });
}
renderSocials($("#heroSocials"));
renderSocials($("#footerSocials"));

/* ----- Profile image fallback ----- */
const pImg = $("#profileImg");
function pFail() { pImg.hidden = true; $("#profileFb").hidden = false; }
pImg.addEventListener("error", pFail);
if (pImg.complete && pImg.naturalWidth === 0) pFail();

/* ----- Mobile nav ----- */
const burger = $("#burger"), menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$(".nl").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); } });

/* ----- Smooth scrolling (CSS handles it; this covers hash links + focus) ----- */
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const t = $(a.getAttribute("href"));
  if (!t) return;
  e.preventDefault();
  t.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  history.replaceState(null, "", a.getAttribute("href"));
}));

/* ----- Active nav highlighting ----- */
const links = $$(".nl");
const secObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => {
        const on = l.getAttribute("href") === "#" + en.target.id;
        l.classList.toggle("active", on);
        on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current");
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => secObs.observe(s));

/* ----- Scroll reveal ----- */
const revObs = "IntersectionObserver" in window ? new IntersectionObserver((entries, o) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); o.unobserve(en.target); } });
}, { threshold: 0.12 }) : null;
function watch(e) { e.classList.add("reveal"); revObs ? revObs.observe(e) : e.classList.add("in"); }
$$(".reveal").forEach(e => revObs ? revObs.observe(e) : e.classList.add("in"));

/* ----- Modal ----- */
const modal = $("#modal"), mTitle = $("#modalTitle"), mBody = $("#modalBody"), mClose = $("#modalClose");
let lastFocus = null;
function openModal(title, nodes, opener) {
  lastFocus = opener || document.activeElement;
  mTitle.textContent = title;
  mBody.replaceChildren(...nodes);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  mClose.focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  mBody.replaceChildren();
  if (lastFocus) lastFocus.focus();
}
mClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => {
  if (modal.hidden) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") {           // keep focus inside the dialog
    const f = $$("button, a[href]", modal);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ----- Projects ----- */
function techNode(list) {
  if (!list.length) return el("p", "tbd", "Technologies to be updated.");
  const ul = el("ul", "tags");
  list.forEach(t => ul.append(el("li", "", t)));
  return ul;
}
function linkBtn(text, url, cls) {
  const a = el("a", "btn sm " + cls, text);
  a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
  return a;
}
PROJECTS.forEach(p => {
  const card = el("article", "card");
  card.append(el("p", "type", p.type), el("h3", "", p.title), el("p", "d", p.description), techNode(p.technologies));
  const act = el("div", "actions");
  const more = el("button", "btn sm primary", "View Details");
  more.type = "button";
  more.addEventListener("click", () => {
    const nodes = [el("p", "type", p.type), el("p", "", p.description)];
    p.details.forEach(d => nodes.push(el("p", "", d)));
    nodes.push(el("h4", "", "Technologies"), techNode(p.technologies));
    const row = el("div", "actions");
    if (validUrl(p.github)) row.append(linkBtn("GitHub", p.github, "ghost"));
    if (validUrl(p.demo)) row.append(linkBtn("Live Demo", p.demo, "ghost"));
    if (row.children.length) nodes.push(row);
    openModal(p.title, nodes, more);
  });
  act.append(more);
  if (validUrl(p.github)) act.append(linkBtn("GitHub", p.github, "ghost"));
  if (validUrl(p.demo)) act.append(linkBtn("Live Demo", p.demo, "ghost"));
  card.append(act);
  $("#projectGrid").append(card);
  watch(card);
});

/* ----- Certificates ----- */
function placeholder() {
  const d = el("div", "ph");
  d.append(el("b", "", "Upload Certificate Image"), el("span", "", "Add the file to the assets/certificates folder."));
  return d;
}
CERTIFICATES.forEach(c => {
  const card = el("article", "card");
  const box = el("div", "cert-img");
  const act = el("div", "actions");
  const view = el("button", "btn sm primary", "View Certificate");
  view.type = "button";
  view.disabled = true;

  const img = new Image();
  img.alt = c.title + " from " + c.organization;
  img.addEventListener("load", () => {
    box.replaceChildren(img);
    view.disabled = false;
    const dl = el("a", "btn sm ghost", "Download");
    dl.href = c.image; dl.download = c.image.split("/").pop();
    act.append(dl);
  });
  img.addEventListener("error", () => { box.replaceChildren(placeholder()); view.textContent = "Image Not Uploaded"; });
  box.append(placeholder());
  img.src = c.image;

  view.addEventListener("click", () => {
    const big = new Image();
    big.src = c.image; big.alt = img.alt;
    openModal(c.title, [big, el("p", "", c.organization + " | " + c.category)], view);
  });

  card.append(box, el("p", "type", c.category), el("h3", "", c.title), el("p", "d", c.organization));
  act.prepend(view);
  card.append(act);
  $("#certGrid").append(card);
  watch(card);
});

/* ----- Contact form validation ----- */
const form = $("#contactForm");
const rules = {
  Name: v => v.trim().length >= 2 ? "" : "Enter your name (at least 2 characters).",
  Email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email address.",
  Subject: v => v.trim().length >= 3 ? "" : "Enter a subject (at least 3 characters).",
  Message: v => v.trim().length >= 10 ? "" : "Enter a message (at least 10 characters)."
};
function check(k) {
  const input = $("#c" + k), msg = rules[k](input.value);
  $("#e" + k).textContent = msg;
  input.classList.toggle("invalid", !!msg);
  input.setAttribute("aria-invalid", !!msg);
  return !msg;
}
Object.keys(rules).forEach(k => $("#c" + k).addEventListener("blur", () => check(k)));
form.addEventListener("submit", e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(check).every(Boolean);
  const notice = $("#formNotice");
  if (!ok) { notice.textContent = "Please fix the highlighted fields."; $(".invalid", form).focus(); return; }
  // Build a mailto link so the visitor can actually send the message.
  const body = "Name: " + $("#cName").value + "\nEmail: " + $("#cEmail").value + "\n\n" + $("#cMessage").value;
  $("#mailAlt").href = "mailto:dharund9597@gmail.com?subject=" + encodeURIComponent($("#cSubject").value) + "&body=" + encodeURIComponent(body);
  notice.textContent = "Your message is valid, but it has not been sent: this site has no backend or email service. Use 'Send by Email Instead' to open it in your email app.";
});

/* ----- Footer, back to top ----- */
$("#year").textContent = new Date().getFullYear();
$("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }));