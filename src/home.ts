import { homeIntroduction, members } from './data';
import { basePath, imagePath } from './paths';
import { enableInterfaceSounds } from './sound';

// Outlines follow the supplied composite characters, including their human heads.
// Vector silhouettes exclude the white backdrops, rings and captions in the photos.
const silhouettes: Record<number, { viewBox: string; outline: string }> = {
  2: {
    viewBox: '0 0 1254 1254',
    outline: 'M 265 193 C 264 95 358 32 422 30 L 411 18 452 20 467 10 490 17 C 579 -1 640 39 672 61 L 699 70 690 82 C 746 152 742 242 701 290 L 683 333 650 344 C 638 397 615 443 623 472 L 816 593 856 586 Q 873 582 860 609 L 839 629 885 624 Q 912 627 890 646 L 872 660 891 671 Q 906 686 872 697 C 803 726 733 702 677 699 C 720 786 766 873 797 916 C 929 922 1025 834 1039 760 C 985 749 955 718 946 680 C 941 642 963 621 979 587 C 1006 534 1002 497 1017 456 L 1045 503 C 1057 452 1047 408 1030 378 C 1082 405 1094 446 1092 483 L 1105 437 C 1122 482 1118 529 1139 558 L 1129 546 1158 565 1153 620 1165 598 C 1176 656 1169 722 1138 752 L 1110 767 C 1106 941 1008 1035 852 1086 L 848 1105 866 1121 843 1122 855 1148 872 1181 838 1171 856 1212 815 1191 809 1230 760 1203 C 723 1186 695 1150 672 1106 C 625 1071 596 1037 546 1041 C 477 1045 441 1065 420 1101 L 418 1124 372 1143 293 1159 221 1206 241 1171 185 1200 204 1161 153 1176 186 1130 137 1137 C 165 1106 191 1081 223 1064 C 228 965 286 868 304 791 L 309 687 C 247 702 183 705 139 697 L 157 663 126 640 143 626 118 608 Q 105 590 127 594 L 157 600 C 230 567 290 539 341 518 C 306 500 281 471 270 441 C 248 411 258 382 251 359 C 240 337 244 316 251 294 C 253 263 250 225 265 193 Z',
  },
  1: {
    viewBox: '0 0 1254 1254',
    outline: 'M 202 470 C 182 418 206 323 252 300 L 280 280 306 280 C 329 231 372 214 420 216 L 452 213 482 226 C 579 235 655 279 704 342 C 770 302 808 321 857 326 C 913 328 961 295 990 254 C 1009 272 1010 292 1003 307 C 1023 285 1043 274 1061 272 L 1041 329 C 1067 313 1084 311 1097 311 C 1039 400 1061 448 1100 511 C 1157 602 1185 690 1151 760 C 1134 799 1099 823 1058 837 C 1064 914 1057 978 1034 1017 L 1022 1054 989 1057 Q 974 1080 947 1060 L 915 1065 902 1054 878 1058 892 1021 867 977 C 834 1009 800 1031 773 1049 L 748 1075 722 1074 Q 704 1092 678 1081 L 653 1083 628 1074 595 1070 607 1039 C 612 1021 622 1007 635 993 L 616 975 605 1002 575 1004 585 981 593 973 C 535 958 510 940 478 914 C 471 958 459 995 439 1021 L 429 1040 401 1040 384 1033 359 1040 350 1021 334 1021 348 991 C 330 947 316 886 325 808 C 279 788 252 756 247 716 C 230 686 240 653 225 625 L 219 600 C 188 580 190 550 199 533 L 193 530 190 516 204 514 Z',
  },
  3: {
    viewBox: '0 0 1288 1222',
    outline: 'M 516 296 C 510 263 520 236 537 213 L 524 211 545 196 538 186 561 176 554 164 580 159 574 148 601 145 598 134 622 136 630 120 650 127 665 115 683 122 695 111 710 123 730 115 739 131 762 128 765 144 783 144 780 160 794 167 C 778 182 777 204 789 228 L 815 249 Q 824 260 815 273 L 830 284 811 299 C 806 320 823 332 813 354 L 800 379 C 786 396 784 420 780 453 C 855 465 917 502 978 536 L 1008 533 Q 1034 532 1025 553 L 1011 575 1039 597 Q 1051 614 1028 620 C 979 637 921 635 879 631 C 877 704 891 758 912 795 C 929 826 932 863 924 883 L 952 902 956 913 930 913 943 934 923 933 916 951 887 943 C 847 941 812 923 785 898 L 744 862 C 709 874 662 873 630 859 C 625 903 635 947 613 964 L 597 976 577 969 560 989 538 981 520 987 497 970 478 976 454 959 436 959 C 427 945 437 918 433 897 C 361 920 299 916 258 881 C 207 892 175 860 167 819 C 149 778 166 728 204 703 C 244 679 285 679 323 696 L 393 713 C 385 646 401 579 421 535 C 438 493 489 445 532 419 L 551 400 C 556 367 534 342 531 324 Z',
  },
};

export function setupHome() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="${basePath}" aria-label="김박사의 연구소, 처음으로">
        <span class="pokeball-mark" aria-hidden="true"></span>
        <span>김박사의 연구소<span class="brand-subtitle">PROFESSOR KIM'S LAB</span></span>
      </a>
      <div class="header-location"><span class="status-dot"></span> 태초마을 <span class="location-divider">/</span> KANTO REGION</div>
    </header>
    <main class="home">
      <section class="home-intro" aria-labelledby="intro-title">
        <div class="intro-content">
          <div class="intro-copy">
            <p class="eyebrow"><span></span> ${homeIntroduction.eyebrow}</p>
            <h1 id="intro-title">${homeIntroduction.title}<br /><em>${homeIntroduction.highlight}</em></h1>
            <div class="intro-description">${homeIntroduction.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}</div>
            <p class="intro-signature"><span class="status-dot"></span> 세 명의 파트너, 함께 써 내려갈 이야기</p>
          </div>
          <div class="intro-professor professor">
            <span class="intro-orbit" aria-hidden="true"></span>
            <div class="oak-frame">
              <img class="oak-image professor-normal" src="${imagePath('professor.png')}" alt="연구소에서 반갑게 맞아주는 김박사" fetchpriority="high" />
              <img class="oak-image professor-hover" src="${imagePath('professor real.png')}" alt="" aria-hidden="true" />
            </div>
            <span class="professor-caption"><span class="status-dot"></span> 김박사 <span>우리의 모험을 함께하는 연구가</span></span>
          </div>
        </div>
        <a class="scroll-cue" href="#meet-partners"><span>아래로 내려 새로운 친구들을 만나보세요</span><span aria-hidden="true">↓</span></a>
      </section>
      <section class="home-partners" id="meet-partners" aria-labelledby="partners-title">
        <div class="partners-heading"><span>01 / MEET OUR PARTNERS</span><span>아직 발견하지 못한 우리들의 모습</span></div>
        <div class="partners-panel">
          <div class="silhouette-gallery" aria-label="세 파트너의 실루엣">
            ${members.map(member => `
              <figure class="silhouette-figure" style="--partner-color: ${member.color}">
                <span class="silhouette-question" aria-hidden="true">?</span>
                <svg class="partner-silhouette" viewBox="${silhouettes[member.id].viewBox}" role="img" aria-label="${member.pokemonName}의 합성 포켓몬 실루엣">
                  <path d="${silhouettes[member.id].outline}" fill="currentColor" />
                </svg>
                <figcaption>${member.no}<span>UNKNOWN PARTNER</span></figcaption>
              </figure>
            `).join('')}
          </div>
          <div class="partners-copy">
            <p class="eyebrow"><span></span> WHO'S THAT POKÉMON?</p>
            <h2 id="partners-title">어떤 친구들이<br />기다리고 있을까요?</h2>
            <p>실루엣 너머 숨겨진 반전 매력.<br />도감을 열어 우리를 조금 더 알아가 보세요.</p>
            <a class="pokedex-link" href="${basePath}pokedex.html">포켓몬 도감으로 이동하기 <span aria-hidden="true">↗</span></a>
            <span class="partners-note"><span class="tiny-ball" aria-hidden="true"></span> 세 개의 포켓볼에 담긴 세 가지 이야기</span>
          </div>
        </div>
      </section>
    </main>
    <footer class="site-footer"><span>작은 만남에서 시작되는, 우리의 이야기.</span><span>GCS <span class="footer-cross">×</span> POKÉMON <span class="footer-year">2026</span></span></footer>
  `;

  enableInterfaceSounds(app);
}
