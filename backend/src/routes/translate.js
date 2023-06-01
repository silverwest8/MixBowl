'use strict';

import express from 'express';
import axios from 'axios';
import { db } from '../models';
import { Sequelize } from 'sequelize';
import { logger } from '../../winston/winston';
const router = express.Router();

router.get('/cocktailName', async (req, res) => {
  try {
    let list = [
      { CNO: 1, NAME: '롱 아일랜드 아이스 티' },
      { CNO: 2, NAME: '솔티 도그' },
      { CNO: 3, NAME: '베스퍼 마티니' },
      { CNO: 4, NAME: '블루 하와이' },
      { CNO: 5, NAME: '브라스 몽키' },
      { CNO: 6, NAME: '긴자 메리' },
      { CNO: 7, NAME: '아디오스 머더퍼커' },
      { CNO: 8, NAME: '애플 마티니' },
      { CNO: 9, NAME: '블랙 러시안' },
      { CNO: 10, NAME: '블러디 메리' },
      { CNO: 11, NAME: '마티니 칵테일' },
      { CNO: 12, NAME: '호스 넥' },
      { CNO: 13, NAME: '싱가포르 슬링' },
      { CNO: 14, NAME: '파라다이스' },
      { CNO: 16, NAME: '트웬티스 센추리' },
      { CNO: 17, NAME: '알렉산더' },
      { CNO: 18, NAME: '엔젤 페이스' },
      { CNO: 19, NAME: '아비에이션' },
      { CNO: 20, NAME: '비스 니즈' },
      { CNO: 21, NAME: '프렌치 커넥션' },
      { CNO: 22, NAME: '플레이밍 볼케이노' },
      { CNO: 25, NAME: '패딩턴' },
      { CNO: 26, NAME: '크랩 말리스 칵테일' },
      { CNO: 27, NAME: '크래들 오브 라이프' },
      { CNO: 28, NAME: '크래프트 스트로베리 다이키리 (케빈 리우)' },
      { CNO: 29, NAME: '더 비터 엔드' },
      { CNO: 30, NAME: '라임 리키' },
      { CNO: 31, NAME: '더비' },
      { CNO: 32, NAME: '크렘린 코로넬' },
      { CNO: 33, NAME: '블루바디에' },
      { CNO: 34, NAME: '버번 랜서' },
      { CNO: 35, NAME: '미주리 뮬' },
      { CNO: 36, NAME: '민트 주립' },
      { CNO: 38, NAME: '위스키 사워' },
      { CNO: 39, NAME: '배틀 오브 뉴올리언스' },
      { CNO: 41, NAME: '쿠퍼스타운 칵테일' },
      { CNO: 42, NAME: '블랙손' },
      { CNO: 43, NAME: '댐 더 웨더' },
      { CNO: 44, NAME: '마르티네즈' },
      { CNO: 45, NAME: '롭 로이' },
      { CNO: 46, NAME: '처칠' },
      { CNO: 47, NAME: '비에 카레' },
      { CNO: 48, NAME: '퀸 메리' },
      { CNO: 49, NAME: '잭 로즈' },
      { CNO: 50, NAME: '몽키 글랜드' },
      { CNO: 51, NAME: '핑크 레이디' },
      { CNO: 52, NAME: '바카디' },
      { CNO: 53, NAME: '쿠바 선셋' },
      { CNO: 54, NAME: '엘 프레지덴테' },
      { CNO: 55, NAME: '메리 픽포드' },
      { CNO: 57, NAME: '톰 콜린스' },
      { CNO: 58, NAME: '화안 콜린스' },
      { CNO: 59, NAME: '모히또 블랑코' },
      { CNO: 60, NAME: '퀸즈' },
      { CNO: 61, NAME: '페이인킬러' },
      { CNO: 62, NAME: '피냐 콜라다' },
      { CNO: 63, NAME: '럼 스위즐' },
      { CNO: 64, NAME: '마타도르' },
      { CNO: 65, NAME: '치치' },
      { CNO: 66, NAME: '아과 데 세비야' },
      { CNO: 69, NAME: '섬세플뤼 배스터드' },
      { CNO: 70, NAME: '더 라스트 워드' },
      { CNO: 71, NAME: '코히토' },
      { CNO: 73, NAME: '사이드카' },
      { CNO: 11000, NAME: '모히또' },
      { CNO: 11001, NAME: '올드 패션드' },
      { CNO: 11005, NAME: '드라이 마티니' },
      { CNO: 11008, NAME: '맨해튼' },
      { CNO: 11728, NAME: '마티니' },
      { CNO: 12560, NAME: '애프터글로우' },
      { CNO: 12618, NAME: '오렌지에이드' },
      { CNO: 13214, NAME: '피스코 사워' },
      { CNO: 13621, NAME: '테킬라 선라이즈' },
      { CNO: 14366, NAME: '레몬 드롭' },
      { CNO: 14608, NAME: '크림 소다' },
      { CNO: 17181, NAME: '더티 마티니' },
      { CNO: 17196, NAME: '코스모폴리탄' },
      { CNO: 17212, NAME: '에스프레소 마티니' },
      { CNO: 17213, NAME: '프렌치 마티니' },
      { CNO: 17218, NAME: '베스퍼' },
      { CNO: 17241, NAME: '좀비' },
      { CNO: 17250, NAME: '코립스 리바이버' },
      { CNO: 17252, NAME: '그레이하운드' },
      { CNO: 17253, NAME: '팔로마' },
      { CNO: 17254, NAME: '비주' },
      { CNO: 17255, NAME: '김렛' },
      { CNO: 178334, NAME: '데스 인 더 애프터눈' },
      { CNO: 178343, NAME: '미셀라다' },
      { CNO: 178345, NAME: '핫 토디' },
      { CNO: 178354, NAME: '핑크 문' },
      { CNO: 178357, NAME: '포르노스타 마티니' },
      { CNO: 178365, NAME: '진 토닉' },
      { CNO: 178367, NAME: '라모스 진 피즈' },
      { CNO: 178368, NAME: '플랜터스 펀치' },
      { CNO: 178874, NAME: '테스트테스트 에딧' },
    ];

    for (let i = 0; i < list.length; i++) {
      const data = await db.COCKTAIL_KO.update(
        { NAME: list[i].NAME },
        {
          where: { CNO: list[i].CNO },
        }
      );
    }
    res.status(200).json({ success: true, message: '번역 성공' });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: '번역 실패', error });
  }
});

router.get('/recipeName', async (req, res) => {
  try {
    let list = [
      { CNO: 1, NAME: 'Cointreau', NAME_KO: '꼬앙트로' },
      { CNO: 1, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 1, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 1, NAME: 'simple syrup', NAME_KO: '단순 시럽' },
      { CNO: 1, NAME: 'Tequila', NAME_KO: '테킬라' },
      { CNO: 1, NAME: 'Top with Cola', NAME_KO: '콜라로 마무리' },
      { CNO: 1, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 1, NAME: 'White rum', NAME_KO: '화이트 럼' },
      { CNO: 2, NAME: 'gin or vodka', NAME_KO: '진 또는 보드카' },
      { CNO: 2, NAME: 'grapefruit juice', NAME_KO: '자몽 주스' },
      { CNO: 3, NAME: 'gin', NAME_KO: '진' },
      { CNO: 3, NAME: 'Lillet Blanc', NAME_KO: '릴레 블랑' },
      { CNO: 3, NAME: 'vodka', NAME_KO: '보드카' },
      { CNO: 4, NAME: 'Blue Curacao', NAME_KO: '블루 큐라소' },
      { CNO: 4, NAME: 'light rum', NAME_KO: '라이트 럼' },
      {
        CNO: 4,
        NAME: 'pineapple juice, unsweetened',
        NAME_KO: '파인애플 주스 (미각을 담백하게)',
      },
      { CNO: 4, NAME: 'Sour mix', NAME_KO: '사워 믹스' },
      { CNO: 4, NAME: 'vodka', NAME_KO: '보드카' },
      { CNO: 5, NAME: 'dark rum', NAME_KO: '다크 럼' },
      { CNO: 5, NAME: 'orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 5, NAME: 'vodka', NAME_KO: '보드카' },
      { CNO: 6, NAME: 'Celery salt', NAME_KO: '셀러리 소금' },
      { CNO: 6, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 6, NAME: 'Mint leaves', NAME_KO: '민트 잎' },
      { CNO: 6, NAME: 'Tabasco sauce', NAME_KO: '타바스코 소스' },
      { CNO: 6, NAME: 'Tomato juice', NAME_KO: '토마토 주스' },
      { CNO: 6, NAME: 'vodka', NAME_KO: '보드카' },
      { CNO: 6, NAME: 'Worcestershire Sauce', NAME_KO: '워스터 소스' },
      { CNO: 7, NAME: 'Cointreau', NAME_KO: '꼬앙트로' },
      { CNO: 7, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 7, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 7, NAME: 'simple syrup', NAME_KO: '단순 시럽' },
      { CNO: 7, NAME: 'Tequila', NAME_KO: '테킬라' },
      { CNO: 7, NAME: 'Top with Cola', NAME_KO: '콜라로 마무리' },
      { CNO: 7, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 7, NAME: 'White rum', NAME_KO: '화이트 럼' },
      {
        CNO: 8,
        NAME: 'Apple schnapps / Calvados',
        NAME_KO: '애플 스냅스 / 칼바도스',
      },
      { CNO: 8, NAME: 'Cointreau', NAME_KO: '꼬앙트로' },
      { CNO: 8, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 9, NAME: 'Coffee liqueur', NAME_KO: '커피 리큐어' },
      { CNO: 9, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 10, NAME: 'Black pepper', NAME_KO: '검은 후추' },
      { CNO: 10, NAME: 'Celery salt', NAME_KO: '셀러리 소금' },
      { CNO: 10, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 10, NAME: 'Tabasco sauce', NAME_KO: '타바스코 소스' },
      { CNO: 10, NAME: 'Tomato juice', NAME_KO: '토마토 주스' },
      { CNO: 10, NAME: 'vodka', NAME_KO: '보드카' },
      { CNO: 10, NAME: 'Worcestershire Sauce', NAME_KO: '워스터 소스' },
      { CNO: 11, NAME: 'dry vermouth', NAME_KO: '드라이 버무트' },
      { CNO: 11, NAME: 'gin', NAME_KO: '진' },

      {
        CNO: 12,
        NAME: 'Angostura bitter (optional)',
        NAME_KO: '앙고스투라 비터 (선택 사항)',
      },
      { CNO: 12, NAME: 'Brandy', NAME_KO: '브랜디' },
      { CNO: 12, NAME: 'Ginger ale', NAME_KO: '진저 에일' },
      { CNO: 13, NAME: 'Angostura bitters', NAME_KO: '앙고스투라 비터' },
      {
        CNO: 13,
        NAME: 'cherry liqueur (such as maraschino)',
        NAME_KO: '체리 리큐어 (마라스키노 같은)',
      },
      { CNO: 13, NAME: 'Cointreau', NAME_KO: '꼬앙트로' },
      { CNO: 13, NAME: 'DOM Benedictine', NAME_KO: 'DOM 베네딕틴' },
      { CNO: 13, NAME: 'fresh lime juice', NAME_KO: '신선한 라임 주스' },
      { CNO: 13, NAME: 'gin', NAME_KO: '진' },
      { CNO: 13, NAME: 'Grenadine', NAME_KO: '그레나딘' },
      { CNO: 13, NAME: 'pineapple juice', NAME_KO: '파인애플 주스' },
      { CNO: 14, NAME: 'apricot brandy', NAME_KO: '살구 브랜디' },
      { CNO: 14, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 14, NAME: 'orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 16, NAME: 'fresh lemon juice', NAME_KO: '신선한 레몬 주스' },
      { CNO: 16, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 16, NAME: 'Kina Lillet', NAME_KO: '키나 릴레' },
      {
        CNO: 16,
        NAME: 'light creme de cacao',
        NAME_KO: '라이트 크림 드 카카오',
      },
      { CNO: 17, NAME: 'Cream', NAME_KO: '크림' },
      { CNO: 17, NAME: 'Creme de Cacao', NAME_KO: '크림 드 카카오' },
      { CNO: 17, NAME: 'Gin (London Dry)', NAME_KO: '진 (런던 드라이)' },
      { CNO: 18, NAME: 'Apricot liqueur', NAME_KO: '살구 리큐어' },
      { CNO: 18, NAME: 'Calvados', NAME_KO: '칼바도스' },
      { CNO: 18, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 19, NAME: 'creme de violette', NAME_KO: '크레메 드 비올레트' },
      { CNO: 19, NAME: 'gin', NAME_KO: '진' },
      { CNO: 19, NAME: 'lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 19, NAME: 'maraschino liqueur', NAME_KO: '마라스키노 리큐어' },
      { CNO: 20, NAME: 'dry gin', NAME_KO: '드라이 진' },
      { CNO: 20, NAME: 'honey syrup', NAME_KO: '꿀 시럽' },
      { CNO: 20, NAME: 'lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 20, NAME: 'orange juice', NAME_KO: '오렌지 주스' },
      {
        CNO: 21,
        NAME: 'Bianco Vermouth, Dolin',
        NAME_KO: '비앙코 베르무트, 돌랭',
      },
      {
        CNO: 21,
        NAME: 'Cane syrup, Petite Canne',
        NAME_KO: '설탕 시럽, 피테키프 칸',
      },
      { CNO: 21, NAME: 'Grapes (red)', NAME_KO: '포도 (빨강)' },
      {
        CNO: 21,
        NAME: 'Light rum, Plantation 3 Star',
        NAME_KO: '라이트 럼, 플랜테이션 3스타',
      },
      { CNO: 21, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      { CNO: 21, NAME: 'Luxardo Bitter', NAME_KO: '룩사르도 비터' },
      { CNO: 22, NAME: 'brandy', NAME_KO: '브랜디' },
      {
        CNO: 22,
        NAME: 'lemon juice, unsweetened',
        NAME_KO: '레몬 주스 (미각을 담백하게)',
      },
      { CNO: 22, NAME: 'light rum', NAME_KO: '라이트 럼' },
      { CNO: 22, NAME: 'orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 22, NAME: 'orgeat syrup', NAME_KO: '오르제아 시럽' },

      { CNO: 22, NAME: 'overproof rum', NAME_KO: '오버프루프 럼' },
      { CNO: 25, NAME: 'Absinthe, Kubler', NAME_KO: '압생트, 쿠블러' },
      {
        CNO: 25,
        NAME: 'Aromatized wine, Lillet Blanc',
        NAME_KO: '아로마티즈 와인, 릴레 블랑',
      },
      { CNO: 25, NAME: 'Grapefruit juice', NAME_KO: '자몽 주스' },
      { CNO: 25, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      {
        CNO: 25,
        NAME: 'Light rum, Banks 5 Island',
        NAME_KO: '라이트 럼, 뱅크스 5 아일랜드',
      },
      { CNO: 25, NAME: 'Orange marmalade', NAME_KO: '오렌지 말레이드' },
      { CNO: 26, NAME: 'Campari', NAME_KO: '카마리' },
      {
        CNO: 26,
        NAME: 'Light rum (white, Cuban-style)',
        NAME_KO: '라이트 럼 (화이트, 쿠바 스타일)',
      },
      { CNO: 26, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      { CNO: 26, NAME: 'Soda water (to top)', NAME_KO: '소다수 (톱)' },
      { CNO: 26, NAME: 'Triple sec, Cointreau', NAME_KO: '트리플 섹, 쿠앤크' },
      { CNO: 27, NAME: 'Bitters, Angostura', NAME_KO: '비터, 안고스투라' },
      {
        CNO: 27,
        NAME: 'Herbal liqueur, Green Chartreuse',
        NAME_KO: '허벌 리큐어, 그린 샤르트뢰즈',
      },
      { CNO: 27, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 27, NAME: 'Light rum', NAME_KO: '라이트 럼' },
      { CNO: 27, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      {
        CNO: 27,
        NAME: 'Lime shell (as garnish)',
        NAME_KO: '라임 껍질 (장식용)',
      },
      { CNO: 27, NAME: 'Orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 27, NAME: 'Orgeat', NAME_KO: '오르젠' },
      { CNO: 27, NAME: 'Spiced Rum', NAME_KO: '스파이스 럼' },
      { CNO: 28, NAME: 'Light rum', NAME_KO: '라이트 럼' },
      { CNO: 28, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      { CNO: 28, NAME: 'Orange flower water', NAME_KO: '오렌지 꽃 물' },
      { CNO: 28, NAME: 'Simple syrup (1:1)', NAME_KO: '심플 시럽 (1:1)' },
      { CNO: 28, NAME: 'Strawberry preserves', NAME_KO: '딸기 잼' },
      { CNO: 29, NAME: 'Bitters, Angostura', NAME_KO: '비터, 안고스투라' },
      {
        CNO: 29,
        NAME: 'Bitters, Angostura (as float)',
        NAME_KO: '비터, 안고스투라 (플로트용)',
      },
      {
        CNO: 29,
        NAME: 'Falernum, Velvet Falernum',
        NAME_KO: '팔레르눔, 벨벳 팔레르눔',
      },
      { CNO: 29, NAME: 'Grapefruit juice', NAME_KO: '자몽 주스' },
      {
        CNO: 29,
        NAME: 'Light rum, Flor de Cana Dry 4',
        NAME_KO: '라이트 럼, 플로르 드 카나 드라이 4',
      },
      { CNO: 29, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      {
        CNO: 30,
        NAME: 'bourbon, rye whiskey, or gin',
        NAME_KO: '버번, 라이 위스키, 또는 진',
      },
      { CNO: 30, NAME: 'lime squeezed', NAME_KO: '라임 스퀴즈' },
      {
        CNO: 30,
        NAME: 'Sparkling mineral water',
        NAME_KO: '스파클링 미네랄 워터',
      },

      { CNO: 31, NAME: 'Bourbon', NAME_KO: '버번' },
      { CNO: 31, NAME: 'Curacao', NAME_KO: '큐라소' },
      { CNO: 31, NAME: 'Lime (as garnish)', NAME_KO: '라임 (장식용)' },
      { CNO: 31, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      { CNO: 31, NAME: 'Mint (as garnish)', NAME_KO: '민트 (장식용)' },
      { CNO: 31, NAME: 'Sweet vermouth', NAME_KO: '스위트 베르무트' },
      { CNO: 32, NAME: 'Bourbon whiskey', NAME_KO: '버번 위스키' },
      { CNO: 32, NAME: 'mint leaves', NAME_KO: '민트 잎' },
      { CNO: 32, NAME: 'powdered sugar', NAME_KO: '파우더 슈가' },
      { CNO: 32, NAME: 'water', NAME_KO: '물' },
      { CNO: 33, NAME: 'Bourbon', NAME_KO: '버번' },
      { CNO: 33, NAME: 'Campari', NAME_KO: '카마리' },
      {
        CNO: 33,
        NAME: 'Maraschino cherry (as garnish)',
        NAME_KO: '마라스키노 체리 (장식용)',
      },
      { CNO: 33, NAME: 'Sweet vermouth', NAME_KO: '스위트 베르무트' },
      { CNO: 34, NAME: 'Angostura bitters', NAME_KO: '앙고스투라 비터' },
      { CNO: 34, NAME: 'Bourbon', NAME_KO: '버번' },
      { CNO: 34, NAME: 'Champagne', NAME_KO: '샴페인' },
      { CNO: 35, NAME: 'Applejack, Lairds', NAME_KO: '애플잭, 레어즈' },
      { CNO: 35, NAME: 'Bourbon', NAME_KO: '버번' },
      { CNO: 35, NAME: 'Campari', NAME_KO: '카마리' },
      { CNO: 35, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 35, NAME: 'Triple sec, Cointreau', NAME_KO: '트리플 섹, 쿠앤크' },
      { CNO: 36, NAME: 'Bourbon whiskey', NAME_KO: '버번 위스키' },
      { CNO: 36, NAME: 'mint leaves', NAME_KO: '민트 잎' },
      { CNO: 36, NAME: 'powdered sugar', NAME_KO: '파우더 슈가' },
      { CNO: 36, NAME: 'water', NAME_KO: '물' },
      { CNO: 38, NAME: 'bourbon whiskey', NAME_KO: '버번 위스키' },
      { CNO: 38, NAME: 'fresh lemon juice', NAME_KO: '신선한 레몬 주스' },
      { CNO: 38, NAME: 'simple syrup', NAME_KO: '심플 시럽' },
      { CNO: 39, NAME: 'Absinthe', NAME_KO: '압생트' },
      { CNO: 39, NAME: 'Bourbon', NAME_KO: '버번' },
      { CNO: 39, NAME: 'Orange bitters', NAME_KO: '오렌지 비터' },
      { CNO: 39, NAME: "Peychaud's Bitters", NAME_KO: '페이쇼드 비터' },
      { CNO: 39, NAME: 'Simple syrup', NAME_KO: '심플 시럽' },
      { CNO: 41, NAME: 'Dry vermouth', NAME_KO: '드라이 베르무트' },
      { CNO: 41, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 41, NAME: 'Mint sprig', NAME_KO: '민트 가지' },
      { CNO: 41, NAME: 'Sweet vermouth', NAME_KO: '스위트 베르무트' },

      { CNO: 42, NAME: 'Absinthe', NAME_KO: '압생트' },
      { CNO: 42, NAME: 'Angostura bitters', NAME_KO: '앙고스투라 비터' },
      { CNO: 42, NAME: 'dry vermouth', NAME_KO: '드라이 베르무트' },
      { CNO: 42, NAME: 'Irish whiskey', NAME_KO: '아일리시 위스키' },
      { CNO: 42, NAME: 'sloe gin', NAME_KO: '슬로 진' },
      { CNO: 42, NAME: 'sweet vermouth', NAME_KO: '스위트 베르무트' },
      { CNO: 43, NAME: 'gin', NAME_KO: '진' },
      {
        CNO: 43,
        NAME: 'orange curacao or triple sec',
        NAME_KO: '오렌지 큐라소 또는 트리플 섹',
      },
      { CNO: 43, NAME: 'orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 43, NAME: 'sweet vermouth', NAME_KO: '스위트 베르무트' },
      {
        CNO: 44,
        NAME: "Bitters, Boker's (or angostura)",
        NAME_KO: '비터, 보커스 (또는 앙고스투라)',
      },
      { CNO: 44, NAME: 'Maraschino Liqueur', NAME_KO: '마라스키노 리큐어' },
      { CNO: 44, NAME: 'Old Tom Gin', NAME_KO: '올드 톰 진' },
      {
        CNO: 44,
        NAME: 'Orange peel (as garnish)',
        NAME_KO: '오렌지 껍질 (장식용)',
      },
      { CNO: 44, NAME: 'Sweet vermouth', NAME_KO: '스위트 베르무트' },
      {
        CNO: 45,
        NAME: "Bitters, Angostura (or Peychaud's)",
        NAME_KO: '비터, 앙고스투라 (또는 페이쇼드)',
      },
      {
        CNO: 45,
        NAME: 'Lemon peel (as garnish)',
        NAME_KO: '레몬 껍질 (장식용)',
      },
      {
        CNO: 45,
        NAME: 'Maraschino cherry (as garnish)',
        NAME_KO: '마라스키노 체리 (장식용)',
      },
      { CNO: 45, NAME: 'Scotch', NAME_KO: '스카치 위스키' },
      { CNO: 45, NAME: 'Sweet vermouth', NAME_KO: '스위트 베르무트' },
      {
        CNO: 46,
        NAME: 'Blended Scotch, Johnnie Walker',
        NAME_KO: '블렌디드 스카치 위스키, 존니 워커',
      },
      { CNO: 46, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      {
        CNO: 46,
        NAME: 'Orange liqueur, Grand Marnier',
        NAME_KO: '오렌지 리큐어, 그랑 마니에',
      },
      { CNO: 46, NAME: 'Sweet vermouth', NAME_KO: '스위트 베르무트' },
      { CNO: 47, NAME: 'Benedictine', NAME_KO: '베네딕틴' },
      { CNO: 47, NAME: 'cognac', NAME_KO: '코냑' },
      { CNO: 47, NAME: "Peychaud's bitters", NAME_KO: '페이쇼드 비터' },
      { CNO: 47, NAME: 'rye whiskey', NAME_KO: '라이 위스키' },
      { CNO: 47, NAME: 'sweet vermouth', NAME_KO: '스위트 베르무트' },
      { CNO: 48, NAME: 'beer', NAME_KO: '맥주' },
      {
        CNO: 48,
        NAME: 'Grenadine (to taste)',
        NAME_KO: '그레나딘 시럽 (맛에 맞게)',
      },
      { CNO: 49, NAME: 'applejack', NAME_KO: '애플잭' },
      { CNO: 49, NAME: 'grenadine', NAME_KO: '그레나딘' },
      { CNO: 49, NAME: 'lemon or lime juice', NAME_KO: '레몬 또는 라임 주스' },
      { CNO: 50, NAME: 'Absinthe', NAME_KO: '압생트' },
      { CNO: 50, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 50, NAME: 'Orange juice', NAME_KO: '오렌지 주스' },
      {
        CNO: 50,
        NAME: 'Raspberry syrup (or grenadine)',
        NAME_KO: '라즈베리 시럽 (또는 그레나딘)',
      },
      { CNO: 51, NAME: 'egg white', NAME_KO: '달걀 흰자' },
      { CNO: 51, NAME: 'gin', NAME_KO: '진' },
      { CNO: 51, NAME: 'grenadine', NAME_KO: '그레나딘' },
      { CNO: 52, NAME: 'grenadine syrup', NAME_KO: '그레나딘 시럽' },
      { CNO: 52, NAME: 'lime juice', NAME_KO: '라임 주스' },
      { CNO: 52, NAME: 'white rum', NAME_KO: '화이트 럼' },
      { CNO: 53, NAME: 'carbonated lime soda', NAME_KO: '탄산 라임 소다' },
      { CNO: 53, NAME: 'grenadine syrup', NAME_KO: '그레나딘 시럽' },
      { CNO: 53, NAME: 'guava nectar', NAME_KO: '구아바 넥타' },
      {
        CNO: 53,
        NAME: 'lemon slice (as garnish)',
        NAME_KO: '레몬 조각 (장식용)',
      },
      { CNO: 53, NAME: 'lemonade', NAME_KO: '레모네이드' },
      {
        CNO: 53,
        NAME: 'rum (preferably white rum)',
        NAME_KO: '럼 (가능하면 화이트 럼)',
      },

      { CNO: 54, NAME: 'Anejo rum', NAME_KO: '아네호 럼' },
      { CNO: 54, NAME: 'Dry vermouth', NAME_KO: '드라이 베르무트' },
      { CNO: 54, NAME: 'Grenadine', NAME_KO: '그레나딘' },
      {
        CNO: 54,
        NAME: 'Orange peel (as garnish)',
        NAME_KO: '오렌지 껍질 (장식용)',
      },
      { CNO: 54, NAME: 'Triple sec, Cointreau', NAME_KO: '트리플 섹, 쿠앤크' },
      {
        CNO: 55,
        NAME: 'fresh pineapple juice',
        NAME_KO: '신선한 파인애플 주스',
      },
      { CNO: 55, NAME: 'Grenadine', NAME_KO: '그레나딘' },
      { CNO: 55, NAME: 'Maraschino', NAME_KO: '마라스키노' },
      { CNO: 55, NAME: 'white rum', NAME_KO: '화이트 럼' },
      {
        CNO: 57,
        NAME: 'carbonated water to taste',
        NAME_KO: '탄산수 (맛에 맞게)',
      },
      {
        CNO: 57,
        NAME: 'freshly squeezed lemon juice',
        NAME_KO: '신선한 레몬 주스',
      },
      { CNO: 57, NAME: 'Old Tom Gin', NAME_KO: '올드 톰 진' },
      { CNO: 57, NAME: 'sugar syrup', NAME_KO: '설탕 시럽' },
      {
        CNO: 58,
        NAME: 'carbonated water to taste',
        NAME_KO: '탄산수 (맛에 맞게)',
      },
      {
        CNO: 58,
        NAME: 'freshly squeezed lemon juice',
        NAME_KO: '신선한 레몬 주스',
      },
      { CNO: 58, NAME: 'Old Tom Gin', NAME_KO: '올드 톰 진' },
      { CNO: 58, NAME: 'sugar syrup', NAME_KO: '설탕 시럽' },
      { CNO: 59, NAME: 'fresh lime juice', NAME_KO: '신선한 라임 주스' },
      { CNO: 59, NAME: 'mint', NAME_KO: '민트' },
      { CNO: 59, NAME: 'Soda water', NAME_KO: '소다수' },
      { CNO: 59, NAME: 'sugar syrup', NAME_KO: '설탕 시럽' },
      { CNO: 59, NAME: 'white rum', NAME_KO: '화이트 럼' },
      { CNO: 60, NAME: 'Dry Vermouth', NAME_KO: '드라이 베르무트' },
      { CNO: 60, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 60, NAME: 'Pineapple juice', NAME_KO: '파인애플 주스' },
      { CNO: 60, NAME: 'Sweet Red Vermouth', NAME_KO: '스위트 레드 베르무트' },
      {
        CNO: 61,
        NAME: 'Coconut cream, Coco Lopez',
        NAME_KO: '코코넛 크림, 코코 로페즈',
      },
      { CNO: 61, NAME: 'Orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 61, NAME: 'Pineapple juice', NAME_KO: '파인애플 주스' },
      { CNO: 61, NAME: "Rum, Pusser's (151)", NAME_KO: '럼, 퍼서스 (151)' },
      {
        CNO: 61,
        NAME: "Rum, Pusser's (British Navy)",
        NAME_KO: '럼, 퍼서스 (영국 해군)',
      },
      { CNO: 62, NAME: 'coconut cream', NAME_KO: '코코넛 크림' },
      {
        CNO: 62,
        NAME: 'fresh pineapple juice',
        NAME_KO: '신선한 파인애플 주스',
      },
      { CNO: 62, NAME: 'white rum', NAME_KO: '화이트 럼' },
      { CNO: 63, NAME: 'Angostura Bitters', NAME_KO: '앙고스투라 비터' },
      { CNO: 63, NAME: 'Bermuda falernum', NAME_KO: '버뮤다 팔러넘' },
      { CNO: 63, NAME: 'black rum', NAME_KO: '블랙 럼' },
      { CNO: 63, NAME: 'gold rum', NAME_KO: '골드 럼' },
      { CNO: 63, NAME: 'Lemons Juice', NAME_KO: '레몬 주스' },
      { CNO: 63, NAME: 'orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 63, NAME: 'pineapple juice', NAME_KO: '파인애플 주스' },
      { CNO: 64, NAME: 'Lime Juice', NAME_KO: '라임 주스' },
      { CNO: 64, NAME: 'pineapple juice', NAME_KO: '파인애플 주스' },
      {
        CNO: 64,
        NAME: 'silver or blanco tequila',
        NAME_KO: '실버 또는 블랑코 테킬라',
      },

      { CNO: 65, NAME: 'coconut cream', NAME_KO: '코코넛 크림' },
      {
        CNO: 65,
        NAME: 'fresh pineapple juice',
        NAME_KO: '신선한 파인애플 주스',
      },
      { CNO: 65, NAME: 'white rum', NAME_KO: '화이트 럼' },
      { CNO: 66, NAME: 'Cava', NAME_KO: '카바' },
      {
        CNO: 66,
        NAME: 'cointreau (triplesec)',
        NAME_KO: '코안트로 (트리플 섹)',
      },
      { CNO: 66, NAME: 'pineapple juice', NAME_KO: '파인애플 주스' },
      { CNO: 66, NAME: 'whiskey', NAME_KO: '위스키' },
      { CNO: 69, NAME: 'Bitters, Angostura', NAME_KO: '비터, 앙고스투라' },
      { CNO: 69, NAME: 'Brandy', NAME_KO: '브랜디' },
      { CNO: 69, NAME: 'Demerara syrup', NAME_KO: '데메라라 시럽' },
      { CNO: 69, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 69, NAME: 'Ginger beer', NAME_KO: '진저 비어' },
      { CNO: 69, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      { CNO: 70, NAME: 'gin', NAME_KO: '진' },
      { CNO: 70, NAME: 'green Chartreuse', NAME_KO: '그린 샤르트루즈' },
      { CNO: 70, NAME: 'lime juice', NAME_KO: '라임 주스' },
      { CNO: 70, NAME: 'maraschino liqueur', NAME_KO: '마라스키노 리큐어' },
      { CNO: 71, NAME: 'lime juice', NAME_KO: '라임 주스' },
      { CNO: 71, NAME: 'Malibu', NAME_KO: '말리부' },
      { CNO: 71, NAME: 'mint', NAME_KO: '민트' },
      { CNO: 71, NAME: 'Mint leaves', NAME_KO: '민트 잎' },
      { CNO: 71, NAME: 'white rum', NAME_KO: '화이트 럼' },
      { CNO: 73, NAME: 'cognac', NAME_KO: '코냑' },
      { CNO: 73, NAME: 'lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 73, NAME: 'triple sec', NAME_KO: '트리플 섹' },
      { CNO: 11000, NAME: 'Light rum', NAME_KO: '라이트 럼' },
      { CNO: 11000, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      { CNO: 11000, NAME: 'Mint', NAME_KO: '민트' },
      { CNO: 11000, NAME: 'Sugar', NAME_KO: '설탕' },
      { CNO: 11001, NAME: 'Angostura bitters', NAME_KO: '앙고스투라 비터' },
      { CNO: 11001, NAME: 'Bourbon', NAME_KO: '버번' },
      { CNO: 11001, NAME: 'Sugar cube', NAME_KO: '설탕 조각' },
      { CNO: 11001, NAME: 'Water', NAME_KO: '물' },
      { CNO: 11005, NAME: 'Dry Vermouth', NAME_KO: '드라이 베르무트' },
      { CNO: 11005, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 11005, NAME: 'Olive', NAME_KO: '올리브' },
      { CNO: 11008, NAME: 'Angostura bitters', NAME_KO: '앙고스투라 비터' },
      { CNO: 11008, NAME: 'Bourbon', NAME_KO: '버번' },
      { CNO: 11008, NAME: 'Ice', NAME_KO: '얼음' },
      { CNO: 11008, NAME: 'Maraschino cherry', NAME_KO: '마라스키노 체리' },
      { CNO: 11008, NAME: 'Orange peel', NAME_KO: '오렌지 껍질' },
      { CNO: 11008, NAME: 'Sweet Vermouth', NAME_KO: '스위트 베르무트' },
      { CNO: 11728, NAME: 'Dry Vermouth', NAME_KO: '드라이 베르무트' },
      { CNO: 11728, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 11728, NAME: 'Olive', NAME_KO: '올리브' },
      { CNO: 12560, NAME: 'Grenadine', NAME_KO: '그레나딘' },
      { CNO: 12560, NAME: 'Orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 12560, NAME: 'Pineapple juice', NAME_KO: '파인애플 주스' },

      { CNO: 12618, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 12618, NAME: 'Orange juice', NAME_KO: '오렌지 주스' },
      { CNO: 12618, NAME: 'Sugar syrup', NAME_KO: '설탕 시럽' },
      { CNO: 13214, NAME: 'Ice', NAME_KO: '얼음' },
      { CNO: 13214, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 13214, NAME: 'Pisco', NAME_KO: '피스코' },
      { CNO: 13214, NAME: 'Sugar', NAME_KO: '설탕' },
      { CNO: 13621, NAME: 'Tequila', NAME_KO: '테킬라' },
      { CNO: 14366, NAME: 'Cointreau', NAME_KO: '코안트로' },
      { CNO: 14366, NAME: 'Lemon juice', NAME_KO: '레몬 주스' },
      { CNO: 14366, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 14608, NAME: 'Spiced rum', NAME_KO: '스파이스 럼' },
      { CNO: 17181, NAME: 'Dry Vermouth', NAME_KO: '드라이 베르무트' },
      { CNO: 17181, NAME: 'Lemon', NAME_KO: '레몬' },
      { CNO: 17181, NAME: 'Olive', NAME_KO: '올리브' },
      { CNO: 17181, NAME: 'Olive Brine', NAME_KO: '올리브 브라인' },
      { CNO: 17181, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 17196, NAME: 'Cointreau', NAME_KO: '코안트로' },
      { CNO: 17196, NAME: 'Cranberry juice', NAME_KO: '크랜베리 주스' },
      { CNO: 17196, NAME: 'Lime juice', NAME_KO: '라임 주스' },
      { CNO: 17196, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 17212, NAME: 'Kahlua', NAME_KO: '깔루아' },
      { CNO: 17212, NAME: 'Sugar syrup', NAME_KO: '설탕 시럽' },
      { CNO: 17212, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 17213, NAME: 'pineapple juice', NAME_KO: '파인애플 주스' },
      { CNO: 17213, NAME: 'Raspberry Liqueur', NAME_KO: '라즈베리 리큐어' },
      { CNO: 17213, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 17218, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 17218, NAME: 'Lillet Blanc', NAME_KO: '릴레 블랑' },
      { CNO: 17218, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 17241, NAME: '151 proof rum', NAME_KO: '151 프루프 럼' },
      { CNO: 17241, NAME: 'Angostura Bitters', NAME_KO: '앙고스투라 비터' },
      { CNO: 17241, NAME: 'Gold rum', NAME_KO: '골드 럼' },
      { CNO: 17241, NAME: 'Grenadine', NAME_KO: '그레나딘' },
      { CNO: 17241, NAME: 'Lime Juice', NAME_KO: '라임 주스' },
      { CNO: 17241, NAME: 'Pernod', NAME_KO: '페르노' },
      { CNO: 17241, NAME: 'Rum', NAME_KO: '럼' },
      { CNO: 17250, NAME: 'Absinthe', NAME_KO: '압서띠' },
      { CNO: 17250, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 17250, NAME: 'Lemon Juice', NAME_KO: '레몬 주스' },
      { CNO: 17250, NAME: 'Lillet Blanc', NAME_KO: '릴레 블랑' },
      { CNO: 17250, NAME: 'Triple Sec', NAME_KO: '트리플 섹' },
      { CNO: 17252, NAME: 'Grapefruit Juice', NAME_KO: '자몽 주스' },
      { CNO: 17252, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 17253, NAME: 'Grape Soda', NAME_KO: '포도 소다' },
      { CNO: 17253, NAME: 'Tequila', NAME_KO: '테킬라' },

      { CNO: 17254, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 17254, NAME: 'Green Chartreuse', NAME_KO: '그린 샤르트루즈' },
      { CNO: 17254, NAME: 'Orange Bitters', NAME_KO: '오렌지 비터' },
      { CNO: 17254, NAME: 'Sweet Vermouth', NAME_KO: '스위트 베르무트' },
      { CNO: 17255, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 17255, NAME: 'Lime', NAME_KO: '라임' },
      { CNO: 17255, NAME: 'Lime Juice', NAME_KO: '라임 주스' },
      { CNO: 17255, NAME: 'Sugar Syrup', NAME_KO: '설탕 시럽' },
      { CNO: 178334, NAME: 'Absinthe', NAME_KO: '압서띠' },
      { CNO: 178334, NAME: 'Champagne (Top)', NAME_KO: '샴페인 (톱)' },
      { CNO: 178343, NAME: 'Beer', NAME_KO: '맥주' },
      { CNO: 178343, NAME: 'Hot Sauce', NAME_KO: '핫 소스' },
      { CNO: 178343, NAME: 'Lime Juice', NAME_KO: '라임 주스' },
      { CNO: 178343, NAME: 'Soy Sauce', NAME_KO: '간장' },
      { CNO: 178343, NAME: 'Tomato Juice', NAME_KO: '토마토 주스' },
      { CNO: 178343, NAME: 'Worcestershire Sauce', NAME_KO: '워스터 소스' },
      { CNO: 178345, NAME: 'Cinnamon', NAME_KO: '계피' },
      { CNO: 178345, NAME: 'Cloves', NAME_KO: '클로브' },
      { CNO: 178345, NAME: 'Honey', NAME_KO: '꿀' },
      { CNO: 178345, NAME: 'lemon', NAME_KO: '레몬' },
      { CNO: 178345, NAME: 'Whiskey', NAME_KO: '위스키' },
      {
        CNO: 178354,
        NAME: 'Blackberries (as garnish)',
        NAME_KO: '블랙베리 (장식용)',
      },
      { CNO: 178354, NAME: 'Coconut Liqueur', NAME_KO: '코코넛 리큐어' },
      {
        CNO: 178354,
        NAME: 'Elderflower cordial',
        NAME_KO: '엘더플라워 코디얼',
      },
      { CNO: 178354, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 178354, NAME: 'Lime Juice', NAME_KO: '라임 주스' },
      { CNO: 178357, NAME: 'Lime', NAME_KO: '라임' },
      { CNO: 178357, NAME: 'Passion fruit juice', NAME_KO: '패션 프루트 주스' },
      { CNO: 178357, NAME: 'Passoa', NAME_KO: '파소아' },
      { CNO: 178357, NAME: 'Prosecco', NAME_KO: '프로세코' },
      { CNO: 178357, NAME: 'Vodka', NAME_KO: '보드카' },
      { CNO: 178365, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 178365, NAME: 'Ice cubes', NAME_KO: '얼음 조각' },
      { CNO: 178365, NAME: 'Lemon Peel', NAME_KO: '레몬 껍질' },
      { CNO: 178365, NAME: 'Tonic Water', NAME_KO: '토닉 워터' },
      { CNO: 178367, NAME: 'Cream', NAME_KO: '크림' },
      { CNO: 178367, NAME: 'Egg White', NAME_KO: '계란 흰자' },
      { CNO: 178367, NAME: 'Gin', NAME_KO: '진' },
      { CNO: 178367, NAME: 'Lemon Juice', NAME_KO: '레몬 주스' },
      { CNO: 178367, NAME: 'Soda Water', NAME_KO: '소다 워터' },
      { CNO: 178367, NAME: 'Sugar Syrup', NAME_KO: '설탕 시럽' },
      { CNO: 178367, NAME: 'Vanilla extract', NAME_KO: '바닐라 추출물' },
      { CNO: 178368, NAME: 'Angostura Bitters', NAME_KO: '앙고스투라 비터' },
      { CNO: 178368, NAME: 'Dark Rum', NAME_KO: '다크 럼' },
      { CNO: 178368, NAME: 'Grenadine', NAME_KO: '그레나딘' },
      { CNO: 178368, NAME: 'Orange Juice', NAME_KO: '오렌지 주스' },
      { CNO: 178368, NAME: 'Pineapple Juice', NAME_KO: '파인애플 주스' },
      { CNO: 178368, NAME: 'Sugar Syrup', NAME_KO: '설탕 시럽' },
    ];

    for (let i = 0; i < list.length; i++) {
      // const data1 = await db.RECIPE_KO.findOne({
      //   where: { CNO: list[i].CNO, NAME: list[i].NAME },
      // });
      // console.log(data1);
      // if (!data1) {
      //   console.log('no data1');
      // }
      const data = await db.RECIPE_KO.update(
        { NAME_KO: list[i].NAME_KO },
        {
          where: { CNO: list[i].CNO, NAME: list[i].NAME },
        }
      );
    }
    res.status(200).json({ success: true, message: '번역 성공' });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: '번역 실패', error });
  }
});

router.get('/migration', async (req, res) => {
  try {
    const cocktailKo = await db.COCKTAIL_KO.findAll();
    console.log(cocktailKo.length);
    for (let i = 0; i < cocktailKo.length; i++) {
      const ko = cocktailKo[i];
      const test = await db.RECIPE.findOne({ where: { CNO: ko.CNO } });
      console.log(test);
      // await db.COCKTAIL.update(
      //   {
      //     NAME_EN: test.NAME,
      //     INSTRUCTION_EN: test.INSTRUCTION,
      //   },
      //   {
      //     where: {
      //       CNO: test.CNO,
      //     },
      //   }
      // );
      await db.RECIPE.update(
        {
          NAME: ko.NAME,
          INSTRUCTION: ko.INSTRUCTION,
        },
        {
          where: {
            CNO: ko.CNO,
          },
        }
      );
    }
    return res.status(200).json({ success: true, message: 'migration 성공' });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'migration 실패', error });
  }
});

router.get('/migrationRecipe', async (req, res) => {
  try {
    const recipeKo = await db.RECIPE_KO.findAll();
    console.log(recipeKo.length);
    for (let i = 0; i < recipeKo.length; i++) {
      const ko = recipeKo[i];
      const test = await db.RECIPE.findOne({
        where: { CNO: ko.CNO, NAME: ko.NAME },
      });
      console.log(test);
      // await db.RECIPE.update(
      //   {
      //     NAME_EN: test.NAME,
      //   },
      //   {
      //     where: {
      //       CNO: test.CNO,
      //       NAME: test.NAME,
      //     },
      //   }
      // );
      await db.RECIPE.update(
        {
          NAME: ko.NAME_KO,
        },
        {
          where: {
            CNO: ko.CNO,
            NAME: ko.NAME,
          },
        }
      );
    }
    return res.status(200).json({ success: true, message: 'migration 성공' });
  } catch (error) {
    logger.error(error);
    return res
      .status(400)
      .json({ success: false, message: 'migration 실패', error });
  }
});

export default router;
