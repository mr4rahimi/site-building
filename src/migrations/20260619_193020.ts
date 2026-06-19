import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('superadmin', 'siteadmin', 'editor');
  CREATE TYPE "public"."enum_media_media_kind" AS ENUM('upload', 'aparat');
  CREATE TYPE "public"."enum_pages_blocks_hero_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_pro_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_video_hero_preload" AS ENUM('none', 'metadata', 'auto');
  CREATE TYPE "public"."enum_pages_blocks_features2_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_issues_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_coverage_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_branches1_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_contact1_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_contact2_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_contact3_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_faq_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_faq2_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_landing_hero_image_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_coverage_with_branches_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_image_with_feature_list_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_service_detail_section_layout" AS ENUM('imageRight', 'imageLeft');
  CREATE TYPE "public"."enum_pages_blocks_issues_accordion_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('home', 'about', 'contact');
  CREATE TYPE "public"."enum_services_blocks_hero_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_hero_pro_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_video_hero_preload" AS ENUM('none', 'metadata', 'auto');
  CREATE TYPE "public"."enum_services_blocks_features2_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_issues_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_coverage_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_branches1_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_contact1_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_contact2_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_contact3_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_faq_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_faq2_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_cta_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_landing_hero_image_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_coverage_with_branches_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_image_with_feature_list_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_service_detail_section_layout" AS ENUM('imageRight', 'imageLeft');
  CREATE TYPE "public"."enum_services_blocks_issues_accordion_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_pricing_table_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TYPE "public"."enum_services_blocks_faq_accordion_theme_color_mode" AS ENUM('site', 'custom');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'superadmin' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sites_id" integer
  );
  
  CREATE TABLE "sites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"primary_domain" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"logo_id" integer,
  	"brand_primary" varchar DEFAULT '#111827',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"media_kind" "enum_media_media_kind" DEFAULT 'upload' NOT NULL,
  	"aparat_url" varchar,
  	"aparat_iframe" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"subheadline" varchar,
  	"badge_text" varchar DEFAULT 'خدمات تخصصی • قطعات اصلی • گارانتی',
  	"image_id" integer,
  	"primary_cta_label" varchar DEFAULT 'ثبت سفارش',
  	"primary_cta_href" varchar DEFAULT '#contact',
  	"secondary_cta_label" varchar DEFAULT 'مشاهده خدمات',
  	"secondary_cta_href" varchar DEFAULT '#services',
  	"theme_color_mode" "enum_pages_blocks_hero_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_bg" varchar,
  	"theme_secondary_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_pro_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_pro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'تعمیرات تخصصی در تهران',
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_button_label" varchar DEFAULT 'ثبت سفارش و تماس',
  	"primary_button_href" varchar DEFAULT '/contact',
  	"secondary_button_label" varchar DEFAULT 'مشاهده خدمات',
  	"secondary_button_href" varchar DEFAULT '#services',
  	"quick_contact_title" varchar DEFAULT 'راه های سریع تماس',
  	"quick_contact_phone" varchar,
  	"quick_contact_phone_display" varchar,
  	"quick_contact_whatsapp" varchar,
  	"quick_contact_address_link_label" varchar DEFAULT 'آدرس شعب و فرم تماس',
  	"quick_contact_address_link_href" varchar DEFAULT '/contact',
  	"quick_contact_hint" varchar DEFAULT '* زمان پاسخگویی سریع در ساعات کاری',
  	"theme_color_mode" "enum_pages_blocks_hero_pro_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_text_color" varchar,
  	"theme_secondary_hover_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"poster_id" integer NOT NULL,
  	"video_id" integer NOT NULL,
  	"alt" varchar DEFAULT 'ویدئو معرفی خدمات',
  	"preload" "enum_pages_blocks_video_hero_preload" DEFAULT 'none',
  	"aspect" varchar DEFAULT '16/9',
  	"muted" boolean DEFAULT true,
  	"plays_inline" boolean DEFAULT true,
  	"loop" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_cards1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"button_label" varchar DEFAULT 'مشاوره و ثبت سفارش',
  	"button_href" varchar DEFAULT '/contact'
  );
  
  CREATE TABLE "pages_blocks_services_cards1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'خدمات تخصصی',
  	"more_link_label" varchar DEFAULT 'جزئیات بیشتر در صفحه خدمات',
  	"more_link_href" varchar DEFAULT '/services',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_cards2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"href" varchar DEFAULT '#services' NOT NULL,
  	"cta_label" varchar DEFAULT 'مشاهده جزئیات ↓'
  );
  
  CREATE TABLE "pages_blocks_services_cards2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'خدمات',
  	"more_link_label" varchar DEFAULT 'رفتن به صفحه خدمات',
  	"more_link_href" varchar DEFAULT '/services',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_features2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'ویژگی‌ها',
  	"theme_color_mode" "enum_pages_blocks_features2_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_icon_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_us1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_why_us1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'چرا ما؟',
  	"subtitle" varchar DEFAULT 'مزیت های کلیدی',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_issues_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_issues" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'ایرادات رایج',
  	"subtitle" varchar DEFAULT 'عیب یابی تخصصی + اعلام هزینه قبل از تعمیر',
  	"cta_label" varchar DEFAULT 'مشاوره و ثبت سفارش',
  	"cta_href" varchar DEFAULT '#contact',
  	"theme_color_mode" "enum_pages_blocks_issues_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_repair_steps1_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_repair_steps1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'مراحل تعمیر',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reviews1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reviews1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'نظرات کاربران',
  	"subtitle" varchar DEFAULT 'تجربه مشتریان از خدمات ما',
  	"hint" varchar DEFAULT 'برای دیدن نظرات بیشتر اسکرول کنید',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_repair_special1_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_repair_special1_side_card_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_repair_special1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'macbook',
  	"background_image_id" integer NOT NULL,
  	"badge_text" varchar DEFAULT 'پشتیبانی از مدل‌های مختلف',
  	"title" varchar DEFAULT 'تعمیر تخصصی' NOT NULL,
  	"description" varchar,
  	"side_card_kicker" varchar DEFAULT 'پروسه استاندارد و دقیق',
  	"side_card_headline" varchar DEFAULT 'عیب‌یابی → تعمیر → تست نهایی',
  	"side_card_phone_cta_label" varchar DEFAULT 'شروع تماس',
  	"side_card_phone_cta_tel" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_repair_special2_service_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_repair_special2_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_repair_special2_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_repair_special2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'ipad',
  	"title" varchar DEFAULT 'تعمیر تخصصی' NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"side_image_id" integer NOT NULL,
  	"caption" varchar,
  	"intro_headline" varchar DEFAULT 'تعمیر دقیق و استاندارد',
  	"intro_p1" varchar,
  	"intro_p2" varchar,
  	"service_list_title" varchar DEFAULT 'خدمات شامل:',
  	"process_steps_title" varchar DEFAULT 'روند استاندارد تعمیر',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_coverage_branches_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_coverage_areas_served" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_coverage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'نقاط تحت پوشش',
  	"pickup_title" varchar DEFAULT 'پیک رایگان',
  	"pickup_description" varchar DEFAULT 'تنها با یک تماس میتوانید از خدمات پیک رایگان دریافت و ارسال دستگاه استفاده نمایید.',
  	"branches_title" varchar DEFAULT 'شعب حضوری',
  	"image_id" integer,
  	"theme_color_mode" "enum_pages_blocks_coverage_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_chip_bg" varchar,
  	"theme_chip_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_branches1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"address" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_branches1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'شعب',
  	"theme_color_mode" "enum_pages_blocks_branches1_theme_color_mode" DEFAULT 'site',
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_accent_soft_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'برای تعمیر آماده‌ای؟',
  	"subtitle" varchar DEFAULT 'همین الان تماس بگیر یا در واتساپ پیام بده.',
  	"primary_button_label" varchar DEFAULT 'تماس فوری',
  	"primary_button_tel" varchar NOT NULL,
  	"secondary_button_label" varchar DEFAULT 'واتساپ',
  	"secondary_button_href" varchar NOT NULL,
  	"theme_color_mode" "enum_pages_blocks_contact1_theme_color_mode" DEFAULT 'site',
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_glow_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_border_color" varchar,
  	"theme_secondary_hover_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'نیاز به تعمیرات داری؟',
  	"subtitle" varchar,
  	"phone_tel" varchar NOT NULL,
  	"phone_display" varchar,
  	"button_label" varchar DEFAULT 'تماس بگیرید',
  	"theme_color_mode" "enum_pages_blocks_contact2_theme_color_mode" DEFAULT 'site',
  	"theme_bg_from" varchar,
  	"theme_bg_via" varchar,
  	"theme_bg_to" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_button_bg" varchar,
  	"theme_button_text" varchar,
  	"theme_button_hover_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact3_side_card_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'animated',
  	"badge_text" varchar DEFAULT 'مشاوره سریع • ثبت درخواست تعمیر • ارسال از سراسر کشور',
  	"title" varchar DEFAULT 'همین الان تماس بگیرید' NOT NULL,
  	"description" varchar,
  	"primary_button_label" varchar DEFAULT 'تماس مستقیم',
  	"primary_button_tel" varchar NOT NULL,
  	"primary_button_phone_display" varchar,
  	"side_card_brand" varchar DEFAULT 'Repair Center',
  	"side_card_headline" varchar DEFAULT 'مسیر سریع تا تعمیر مطمئن',
  	"theme_color_mode" "enum_pages_blocks_contact3_theme_color_mode" DEFAULT 'site',
  	"theme_card_bg" varchar,
  	"theme_side_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_badge_bg" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'سوالات متداول',
  	"theme_color_mode" "enum_pages_blocks_faq_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq2_aside_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'animated',
  	"title" varchar DEFAULT 'سوالات متداول',
  	"intro" varchar,
  	"aside_title" varchar DEFAULT 'اگر پاسخ را پیدا نکردید',
  	"aside_text" varchar DEFAULT 'برای دریافت راهنمایی دقیق‌تر، بهتر است مدل دستگاه و مشکل را اعلام کنید تا سریع‌تر مسیر تعمیر مشخص شود.',
  	"aside_cta_label" varchar DEFAULT 'رفتن به بخش تماس',
  	"aside_cta_href" varchar DEFAULT '#contact',
  	"theme_color_mode" "enum_pages_blocks_faq2_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_aside_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"theme_color_mode" "enum_pages_blocks_cta_theme_color_mode" DEFAULT 'site',
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_card_bg" varchar,
  	"theme_text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_landing_hero_image_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_landing_hero_image_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_landing_hero_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar DEFAULT 'برتر سرویس • تعمیرات تخصصی',
  	"title" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"primary_button_label" varchar DEFAULT 'تماس مستقیم',
  	"primary_button_href" varchar DEFAULT 'tel:02191300348' NOT NULL,
  	"secondary_button_label" varchar DEFAULT 'مشاهده خدمات',
  	"secondary_button_href" varchar DEFAULT '#services' NOT NULL,
  	"theme_color_mode" "enum_pages_blocks_landing_hero_image_theme_color_mode" DEFAULT 'site',
  	"theme_overlay_from" varchar,
  	"theme_overlay_to" varchar,
  	"theme_panel_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_text_color" varchar,
  	"theme_secondary_hover_bg" varchar,
  	"theme_pill_bg" varchar,
  	"theme_pill_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_coverage_with_branches_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_coverage_with_branches_branches" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"address" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_coverage_with_branches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'coverage',
  	"title" varchar NOT NULL,
  	"branches_title" varchar DEFAULT 'آدرس شعب حضوری',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'ثبت سفارش و اعزام پیک رایگان',
  	"cta_href" varchar DEFAULT 'tel:02191300348',
  	"theme_color_mode" "enum_pages_blocks_coverage_with_branches_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_branch_icon_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_with_feature_list_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_image_with_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'why-us',
  	"image_id" integer NOT NULL,
  	"image_caption" varchar,
  	"title" varchar NOT NULL,
  	"theme_color_mode" "enum_pages_blocks_image_with_feature_list_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_caption_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_with_anchors_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"icon_image_id" integer,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_grid_with_anchors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'services',
  	"title" varchar DEFAULT 'خدمات' NOT NULL,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'steps',
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'quick-order',
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"button_label" varchar NOT NULL,
  	"button_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_detail_section_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_detail_section_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_detail_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"layout" "enum_pages_blocks_service_detail_section_layout" DEFAULT 'imageRight',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_issues_accordion_items_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_issues_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_issues_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar NOT NULL,
  	"enable_f_a_q_schema" boolean DEFAULT false,
  	"theme_color_mode" "enum_pages_blocks_issues_accordion_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service" varchar DEFAULT 'نام سرویس' NOT NULL,
  	"price_range" varchar DEFAULT 'از ۱۰ تا ۲۰ میلیون تومان' NOT NULL,
  	"eta" varchar DEFAULT '۷ تا ۱۴ روز کاری',
  	"note" varchar DEFAULT 'توضیحات تکمیلی در صورت نیاز'
  );
  
  CREATE TABLE "pages_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar DEFAULT 'تعرفه خدمات' NOT NULL,
  	"intro" varchar DEFAULT 'لیست قیمت‌ خدمات به‌صورت شفاف و به‌روز.',
  	"footnote" varchar DEFAULT 'قیمت‌ها تقریبی بوده و پس از بررسی دقیق اعلام نهایی می‌شوند.',
  	"theme_color_mode" "enum_pages_blocks_pricing_table_theme_color_mode" DEFAULT 'site',
  	"theme_background" varchar,
  	"theme_card_background" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text" varchar,
  	"theme_border_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'faq',
  	"title" varchar NOT NULL,
  	"theme_color_mode" "enum_pages_blocks_faq_accordion_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"page_type" "enum_pages_page_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"subheadline" varchar,
  	"badge_text" varchar DEFAULT 'خدمات تخصصی • قطعات اصلی • گارانتی',
  	"image_id" integer,
  	"primary_cta_label" varchar DEFAULT 'ثبت سفارش',
  	"primary_cta_href" varchar DEFAULT '#contact',
  	"secondary_cta_label" varchar DEFAULT 'مشاهده خدمات',
  	"secondary_cta_href" varchar DEFAULT '#services',
  	"theme_color_mode" "enum_services_blocks_hero_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_bg" varchar,
  	"theme_secondary_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_hero_pro_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "services_blocks_hero_pro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'تعمیرات تخصصی در تهران',
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"primary_button_label" varchar DEFAULT 'ثبت سفارش و تماس',
  	"primary_button_href" varchar DEFAULT '/contact',
  	"secondary_button_label" varchar DEFAULT 'مشاهده خدمات',
  	"secondary_button_href" varchar DEFAULT '#services',
  	"quick_contact_title" varchar DEFAULT 'راه های سریع تماس',
  	"quick_contact_phone" varchar,
  	"quick_contact_phone_display" varchar,
  	"quick_contact_whatsapp" varchar,
  	"quick_contact_address_link_label" varchar DEFAULT 'آدرس شعب و فرم تماس',
  	"quick_contact_address_link_href" varchar DEFAULT '/contact',
  	"quick_contact_hint" varchar DEFAULT '* زمان پاسخگویی سریع در ساعات کاری',
  	"theme_color_mode" "enum_services_blocks_hero_pro_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_text_color" varchar,
  	"theme_secondary_hover_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_video_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"poster_id" integer NOT NULL,
  	"video_id" integer NOT NULL,
  	"alt" varchar DEFAULT 'ویدئو معرفی خدمات',
  	"preload" "enum_services_blocks_video_hero_preload" DEFAULT 'none',
  	"aspect" varchar DEFAULT '16/9',
  	"muted" boolean DEFAULT true,
  	"plays_inline" boolean DEFAULT true,
  	"loop" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services_cards1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"button_label" varchar DEFAULT 'مشاوره و ثبت سفارش',
  	"button_href" varchar DEFAULT '/contact'
  );
  
  CREATE TABLE "services_blocks_services_cards1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'خدمات تخصصی',
  	"more_link_label" varchar DEFAULT 'جزئیات بیشتر در صفحه خدمات',
  	"more_link_href" varchar DEFAULT '/services',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services_cards2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"href" varchar DEFAULT '#services' NOT NULL,
  	"cta_label" varchar DEFAULT 'مشاهده جزئیات ↓'
  );
  
  CREATE TABLE "services_blocks_services_cards2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'خدمات',
  	"more_link_label" varchar DEFAULT 'رفتن به صفحه خدمات',
  	"more_link_href" varchar DEFAULT '/services',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_features2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "services_blocks_features2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'ویژگی‌ها',
  	"theme_color_mode" "enum_services_blocks_features2_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_icon_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_why_us1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_why_us1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'چرا ما؟',
  	"subtitle" varchar DEFAULT 'مزیت های کلیدی',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_issues_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_issues" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'ایرادات رایج',
  	"subtitle" varchar DEFAULT 'عیب یابی تخصصی + اعلام هزینه قبل از تعمیر',
  	"cta_label" varchar DEFAULT 'مشاوره و ثبت سفارش',
  	"cta_href" varchar DEFAULT '#contact',
  	"theme_color_mode" "enum_services_blocks_issues_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_repair_steps1_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_repair_steps1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'مراحل تعمیر',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_reviews1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_reviews1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'نظرات کاربران',
  	"subtitle" varchar DEFAULT 'تجربه مشتریان از خدمات ما',
  	"hint" varchar DEFAULT 'برای دیدن نظرات بیشتر اسکرول کنید',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_repair_special1_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_repair_special1_side_card_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "services_blocks_repair_special1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'macbook',
  	"background_image_id" integer NOT NULL,
  	"badge_text" varchar DEFAULT 'پشتیبانی از مدل‌های مختلف',
  	"title" varchar DEFAULT 'تعمیر تخصصی' NOT NULL,
  	"description" varchar,
  	"side_card_kicker" varchar DEFAULT 'پروسه استاندارد و دقیق',
  	"side_card_headline" varchar DEFAULT 'عیب‌یابی → تعمیر → تست نهایی',
  	"side_card_phone_cta_label" varchar DEFAULT 'شروع تماس',
  	"side_card_phone_cta_tel" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_repair_special2_service_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_repair_special2_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_repair_special2_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_repair_special2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'ipad',
  	"title" varchar DEFAULT 'تعمیر تخصصی' NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"side_image_id" integer NOT NULL,
  	"caption" varchar,
  	"intro_headline" varchar DEFAULT 'تعمیر دقیق و استاندارد',
  	"intro_p1" varchar,
  	"intro_p2" varchar,
  	"service_list_title" varchar DEFAULT 'خدمات شامل:',
  	"process_steps_title" varchar DEFAULT 'روند استاندارد تعمیر',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_coverage_branches_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_coverage_areas_served" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"area" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_coverage" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'نقاط تحت پوشش',
  	"pickup_title" varchar DEFAULT 'پیک رایگان',
  	"pickup_description" varchar DEFAULT 'تنها با یک تماس میتوانید از خدمات پیک رایگان دریافت و ارسال دستگاه استفاده نمایید.',
  	"branches_title" varchar DEFAULT 'شعب حضوری',
  	"image_id" integer,
  	"theme_color_mode" "enum_services_blocks_coverage_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_chip_bg" varchar,
  	"theme_chip_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_branches1_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"address" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_branches1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'شعب',
  	"theme_color_mode" "enum_services_blocks_branches1_theme_color_mode" DEFAULT 'site',
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_accent_soft_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'برای تعمیر آماده‌ای؟',
  	"subtitle" varchar DEFAULT 'همین الان تماس بگیر یا در واتساپ پیام بده.',
  	"primary_button_label" varchar DEFAULT 'تماس فوری',
  	"primary_button_tel" varchar NOT NULL,
  	"secondary_button_label" varchar DEFAULT 'واتساپ',
  	"secondary_button_href" varchar NOT NULL,
  	"theme_color_mode" "enum_services_blocks_contact1_theme_color_mode" DEFAULT 'site',
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_glow_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_border_color" varchar,
  	"theme_secondary_hover_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'نیاز به تعمیرات داری؟',
  	"subtitle" varchar,
  	"phone_tel" varchar NOT NULL,
  	"phone_display" varchar,
  	"button_label" varchar DEFAULT 'تماس بگیرید',
  	"theme_color_mode" "enum_services_blocks_contact2_theme_color_mode" DEFAULT 'site',
  	"theme_bg_from" varchar,
  	"theme_bg_via" varchar,
  	"theme_bg_to" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_button_bg" varchar,
  	"theme_button_text" varchar,
  	"theme_button_hover_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_contact3_side_card_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_contact3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'animated',
  	"badge_text" varchar DEFAULT 'مشاوره سریع • ثبت درخواست تعمیر • ارسال از سراسر کشور',
  	"title" varchar DEFAULT 'همین الان تماس بگیرید' NOT NULL,
  	"description" varchar,
  	"primary_button_label" varchar DEFAULT 'تماس مستقیم',
  	"primary_button_tel" varchar NOT NULL,
  	"primary_button_phone_display" varchar,
  	"side_card_brand" varchar DEFAULT 'Repair Center',
  	"side_card_headline" varchar DEFAULT 'مسیر سریع تا تعمیر مطمئن',
  	"theme_color_mode" "enum_services_blocks_contact3_theme_color_mode" DEFAULT 'site',
  	"theme_card_bg" varchar,
  	"theme_side_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_badge_bg" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'سوالات متداول',
  	"theme_color_mode" "enum_services_blocks_faq_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq2_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq2_aside_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" varchar DEFAULT 'animated',
  	"title" varchar DEFAULT 'سوالات متداول',
  	"intro" varchar,
  	"aside_title" varchar DEFAULT 'اگر پاسخ را پیدا نکردید',
  	"aside_text" varchar DEFAULT 'برای دریافت راهنمایی دقیق‌تر، بهتر است مدل دستگاه و مشکل را اعلام کنید تا سریع‌تر مسیر تعمیر مشخص شود.',
  	"aside_cta_label" varchar DEFAULT 'رفتن به بخش تماس',
  	"aside_cta_href" varchar DEFAULT '#contact',
  	"theme_color_mode" "enum_services_blocks_faq2_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_aside_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"theme_color_mode" "enum_services_blocks_cta_theme_color_mode" DEFAULT 'site',
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_card_bg" varchar,
  	"theme_text_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_landing_hero_image_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_landing_hero_image_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_landing_hero_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar DEFAULT 'برتر سرویس • تعمیرات تخصصی',
  	"title" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"primary_button_label" varchar DEFAULT 'تماس مستقیم',
  	"primary_button_href" varchar DEFAULT 'tel:02191300348' NOT NULL,
  	"secondary_button_label" varchar DEFAULT 'مشاهده خدمات',
  	"secondary_button_href" varchar DEFAULT '#services' NOT NULL,
  	"theme_color_mode" "enum_services_blocks_landing_hero_image_theme_color_mode" DEFAULT 'site',
  	"theme_overlay_from" varchar,
  	"theme_overlay_to" varchar,
  	"theme_panel_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_secondary_text_color" varchar,
  	"theme_secondary_hover_bg" varchar,
  	"theme_pill_bg" varchar,
  	"theme_pill_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_coverage_with_branches_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_coverage_with_branches_branches" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"address" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_coverage_with_branches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'coverage',
  	"title" varchar NOT NULL,
  	"branches_title" varchar DEFAULT 'آدرس شعب حضوری',
  	"image_id" integer,
  	"cta_label" varchar DEFAULT 'ثبت سفارش و اعزام پیک رایگان',
  	"cta_href" varchar DEFAULT 'tel:02191300348',
  	"theme_color_mode" "enum_services_blocks_coverage_with_branches_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_primary_color" varchar,
  	"theme_primary_hover_color" varchar,
  	"theme_button_text_color" varchar,
  	"theme_branch_icon_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_image_with_feature_list_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "services_blocks_image_with_feature_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'why-us',
  	"image_id" integer NOT NULL,
  	"image_caption" varchar,
  	"title" varchar NOT NULL,
  	"theme_color_mode" "enum_services_blocks_image_with_feature_list_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"theme_caption_bg" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_services_grid_with_anchors_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"icon_image_id" integer,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_services_grid_with_anchors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'services',
  	"title" varchar DEFAULT 'خدمات' NOT NULL,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_steps_timeline_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar
  );
  
  CREATE TABLE "services_blocks_steps_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'steps',
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_simple_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'quick-order',
  	"title" varchar NOT NULL,
  	"desc" varchar,
  	"button_label" varchar NOT NULL,
  	"button_href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_service_detail_section_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_service_detail_section_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_service_detail_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"layout" "enum_services_blocks_service_detail_section_layout" DEFAULT 'imageRight',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_issues_accordion_items_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_issues_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_issues_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar NOT NULL,
  	"enable_f_a_q_schema" boolean DEFAULT false,
  	"theme_color_mode" "enum_services_blocks_issues_accordion_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_pricing_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service" varchar DEFAULT 'نام سرویس' NOT NULL,
  	"price_range" varchar DEFAULT 'از ۱۰ تا ۲۰ میلیون تومان' NOT NULL,
  	"eta" varchar DEFAULT '۷ تا ۱۴ روز کاری',
  	"note" varchar DEFAULT 'توضیحات تکمیلی در صورت نیاز'
  );
  
  CREATE TABLE "services_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"title" varchar DEFAULT 'تعرفه خدمات' NOT NULL,
  	"intro" varchar DEFAULT 'لیست قیمت‌ خدمات به‌صورت شفاف و به‌روز.',
  	"footnote" varchar DEFAULT 'قیمت‌ها تقریبی بوده و پس از بررسی دقیق اعلام نهایی می‌شوند.',
  	"theme_color_mode" "enum_services_blocks_pricing_table_theme_color_mode" DEFAULT 'site',
  	"theme_background" varchar,
  	"theme_card_background" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text" varchar,
  	"theme_border_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"q" varchar NOT NULL,
  	"a" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'faq',
  	"title" varchar NOT NULL,
  	"theme_color_mode" "enum_services_blocks_faq_accordion_theme_color_mode" DEFAULT 'site',
  	"theme_section_bg" varchar,
  	"theme_card_bg" varchar,
  	"theme_border_color" varchar,
  	"theme_text_color" varchar,
  	"theme_muted_text_color" varchar,
  	"theme_accent_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"featured_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_contact_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"number" varchar NOT NULL,
  	"is_whats_app" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_header_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"is_button" boolean DEFAULT false,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_footer_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_id" integer NOT NULL,
  	"site_title" varchar NOT NULL,
  	"general_tagline" varchar,
  	"general_description" varchar,
  	"general_logo_id" integer,
  	"general_logo_dark_id" integer,
  	"general_favicon_id" integer,
  	"contact_email" varchar,
  	"contact_address" varchar,
  	"contact_working_hours" varchar,
  	"contact_map_link" varchar,
  	"social_instagram" varchar,
  	"social_telegram" varchar,
  	"social_whatsapp" varchar,
  	"social_aparat" varchar,
  	"social_youtube" varchar,
  	"social_linkedin" varchar,
  	"social_twitter" varchar,
  	"header_cta_button_label" varchar,
  	"header_cta_button_href" varchar,
  	"footer_about_text" varchar,
  	"footer_copyright" varchar,
  	"seo_meta_title_template" varchar DEFAULT '%s | {{siteTitle}}',
  	"seo_default_meta_description" varchar,
  	"seo_default_og_image_id" integer,
  	"seo_google_analytics_id" varchar,
  	"seo_google_search_console" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"sites_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"site_settings_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_sites_fk" FOREIGN KEY ("sites_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites" ADD CONSTRAINT "sites_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_pro_badges" ADD CONSTRAINT "pages_blocks_hero_pro_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_pro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_pro" ADD CONSTRAINT "pages_blocks_hero_pro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_hero" ADD CONSTRAINT "pages_blocks_video_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_hero" ADD CONSTRAINT "pages_blocks_video_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_hero" ADD CONSTRAINT "pages_blocks_video_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_cards1_items" ADD CONSTRAINT "pages_blocks_services_cards1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_cards1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_cards1" ADD CONSTRAINT "pages_blocks_services_cards1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_cards2_items" ADD CONSTRAINT "pages_blocks_services_cards2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_cards2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_cards2" ADD CONSTRAINT "pages_blocks_services_cards2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features2_items" ADD CONSTRAINT "pages_blocks_features2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features2" ADD CONSTRAINT "pages_blocks_features2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us1_items" ADD CONSTRAINT "pages_blocks_why_us1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_us1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us1" ADD CONSTRAINT "pages_blocks_why_us1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_issues_items" ADD CONSTRAINT "pages_blocks_issues_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_issues" ADD CONSTRAINT "pages_blocks_issues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_steps1_steps" ADD CONSTRAINT "pages_blocks_repair_steps1_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_repair_steps1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_steps1" ADD CONSTRAINT "pages_blocks_repair_steps1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews1_items" ADD CONSTRAINT "pages_blocks_reviews1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reviews1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reviews1" ADD CONSTRAINT "pages_blocks_reviews1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special1_bullets" ADD CONSTRAINT "pages_blocks_repair_special1_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_repair_special1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special1_side_card_items" ADD CONSTRAINT "pages_blocks_repair_special1_side_card_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_repair_special1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special1" ADD CONSTRAINT "pages_blocks_repair_special1_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special1" ADD CONSTRAINT "pages_blocks_repair_special1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special2_service_list" ADD CONSTRAINT "pages_blocks_repair_special2_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_repair_special2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special2_content_blocks" ADD CONSTRAINT "pages_blocks_repair_special2_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_repair_special2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special2_process_steps" ADD CONSTRAINT "pages_blocks_repair_special2_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_repair_special2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special2" ADD CONSTRAINT "pages_blocks_repair_special2_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special2" ADD CONSTRAINT "pages_blocks_repair_special2_side_image_id_media_id_fk" FOREIGN KEY ("side_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_repair_special2" ADD CONSTRAINT "pages_blocks_repair_special2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_branches_items" ADD CONSTRAINT "pages_blocks_coverage_branches_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_coverage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_areas_served" ADD CONSTRAINT "pages_blocks_coverage_areas_served_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_coverage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage" ADD CONSTRAINT "pages_blocks_coverage_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage" ADD CONSTRAINT "pages_blocks_coverage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branches1_items" ADD CONSTRAINT "pages_blocks_branches1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branches1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branches1" ADD CONSTRAINT "pages_blocks_branches1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact1" ADD CONSTRAINT "pages_blocks_contact1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact2" ADD CONSTRAINT "pages_blocks_contact2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact3_side_card_items" ADD CONSTRAINT "pages_blocks_contact3_side_card_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact3" ADD CONSTRAINT "pages_blocks_contact3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq2_items" ADD CONSTRAINT "pages_blocks_faq2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq2_aside_items" ADD CONSTRAINT "pages_blocks_faq2_aside_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq2" ADD CONSTRAINT "pages_blocks_faq2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landing_hero_image_description" ADD CONSTRAINT "pages_blocks_landing_hero_image_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landing_hero_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landing_hero_image_pills" ADD CONSTRAINT "pages_blocks_landing_hero_image_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_landing_hero_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_landing_hero_image" ADD CONSTRAINT "pages_blocks_landing_hero_image_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_landing_hero_image" ADD CONSTRAINT "pages_blocks_landing_hero_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_with_branches_description" ADD CONSTRAINT "pages_blocks_coverage_with_branches_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_coverage_with_branches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_with_branches_branches" ADD CONSTRAINT "pages_blocks_coverage_with_branches_branches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_coverage_with_branches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_with_branches" ADD CONSTRAINT "pages_blocks_coverage_with_branches_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_coverage_with_branches" ADD CONSTRAINT "pages_blocks_coverage_with_branches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_feature_list_features" ADD CONSTRAINT "pages_blocks_image_with_feature_list_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_with_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_feature_list" ADD CONSTRAINT "pages_blocks_image_with_feature_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_feature_list" ADD CONSTRAINT "pages_blocks_image_with_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_with_anchors_items" ADD CONSTRAINT "pages_blocks_services_grid_with_anchors_items_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_with_anchors_items" ADD CONSTRAINT "pages_blocks_services_grid_with_anchors_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid_with_anchors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_with_anchors" ADD CONSTRAINT "pages_blocks_services_grid_with_anchors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_timeline_steps" ADD CONSTRAINT "pages_blocks_steps_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_timeline" ADD CONSTRAINT "pages_blocks_steps_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_c_t_a" ADD CONSTRAINT "pages_blocks_simple_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_section_content" ADD CONSTRAINT "pages_blocks_service_detail_section_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_detail_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_section_pills" ADD CONSTRAINT "pages_blocks_service_detail_section_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_detail_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_section" ADD CONSTRAINT "pages_blocks_service_detail_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_detail_section" ADD CONSTRAINT "pages_blocks_service_detail_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_issues_accordion_items_bullets" ADD CONSTRAINT "pages_blocks_issues_accordion_items_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_issues_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_issues_accordion_items" ADD CONSTRAINT "pages_blocks_issues_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_issues_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_issues_accordion" ADD CONSTRAINT "pages_blocks_issues_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_rows" ADD CONSTRAINT "pages_blocks_pricing_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table" ADD CONSTRAINT "pages_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items" ADD CONSTRAINT "pages_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_pro_badges" ADD CONSTRAINT "services_blocks_hero_pro_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_pro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_pro" ADD CONSTRAINT "services_blocks_hero_pro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_video_hero" ADD CONSTRAINT "services_blocks_video_hero_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video_hero" ADD CONSTRAINT "services_blocks_video_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_video_hero" ADD CONSTRAINT "services_blocks_video_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_cards1_items" ADD CONSTRAINT "services_blocks_services_cards1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_services_cards1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_cards1" ADD CONSTRAINT "services_blocks_services_cards1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_cards2_items" ADD CONSTRAINT "services_blocks_services_cards2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_services_cards2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_cards2" ADD CONSTRAINT "services_blocks_services_cards2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_features2_items" ADD CONSTRAINT "services_blocks_features2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_features2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_features2" ADD CONSTRAINT "services_blocks_features2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_why_us1_items" ADD CONSTRAINT "services_blocks_why_us1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_why_us1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_why_us1" ADD CONSTRAINT "services_blocks_why_us1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_issues_items" ADD CONSTRAINT "services_blocks_issues_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_issues" ADD CONSTRAINT "services_blocks_issues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_steps1_steps" ADD CONSTRAINT "services_blocks_repair_steps1_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_repair_steps1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_steps1" ADD CONSTRAINT "services_blocks_repair_steps1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_reviews1_items" ADD CONSTRAINT "services_blocks_reviews1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_reviews1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_reviews1" ADD CONSTRAINT "services_blocks_reviews1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special1_bullets" ADD CONSTRAINT "services_blocks_repair_special1_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_repair_special1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special1_side_card_items" ADD CONSTRAINT "services_blocks_repair_special1_side_card_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_repair_special1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special1" ADD CONSTRAINT "services_blocks_repair_special1_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special1" ADD CONSTRAINT "services_blocks_repair_special1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special2_service_list" ADD CONSTRAINT "services_blocks_repair_special2_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_repair_special2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special2_content_blocks" ADD CONSTRAINT "services_blocks_repair_special2_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_repair_special2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special2_process_steps" ADD CONSTRAINT "services_blocks_repair_special2_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_repair_special2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special2" ADD CONSTRAINT "services_blocks_repair_special2_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special2" ADD CONSTRAINT "services_blocks_repair_special2_side_image_id_media_id_fk" FOREIGN KEY ("side_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_repair_special2" ADD CONSTRAINT "services_blocks_repair_special2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage_branches_items" ADD CONSTRAINT "services_blocks_coverage_branches_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_coverage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage_areas_served" ADD CONSTRAINT "services_blocks_coverage_areas_served_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_coverage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage" ADD CONSTRAINT "services_blocks_coverage_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage" ADD CONSTRAINT "services_blocks_coverage_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_branches1_items" ADD CONSTRAINT "services_blocks_branches1_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_branches1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_branches1" ADD CONSTRAINT "services_blocks_branches1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact1" ADD CONSTRAINT "services_blocks_contact1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact2" ADD CONSTRAINT "services_blocks_contact2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact3_side_card_items" ADD CONSTRAINT "services_blocks_contact3_side_card_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_contact3"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_contact3" ADD CONSTRAINT "services_blocks_contact3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_items" ADD CONSTRAINT "services_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq" ADD CONSTRAINT "services_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq2_items" ADD CONSTRAINT "services_blocks_faq2_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq2_aside_items" ADD CONSTRAINT "services_blocks_faq2_aside_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq2" ADD CONSTRAINT "services_blocks_faq2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_buttons" ADD CONSTRAINT "services_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_landing_hero_image_description" ADD CONSTRAINT "services_blocks_landing_hero_image_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_landing_hero_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_landing_hero_image_pills" ADD CONSTRAINT "services_blocks_landing_hero_image_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_landing_hero_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_landing_hero_image" ADD CONSTRAINT "services_blocks_landing_hero_image_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_landing_hero_image" ADD CONSTRAINT "services_blocks_landing_hero_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage_with_branches_description" ADD CONSTRAINT "services_blocks_coverage_with_branches_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_coverage_with_branches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage_with_branches_branches" ADD CONSTRAINT "services_blocks_coverage_with_branches_branches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_coverage_with_branches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage_with_branches" ADD CONSTRAINT "services_blocks_coverage_with_branches_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_coverage_with_branches" ADD CONSTRAINT "services_blocks_coverage_with_branches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_with_feature_list_features" ADD CONSTRAINT "services_blocks_image_with_feature_list_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_image_with_feature_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_with_feature_list" ADD CONSTRAINT "services_blocks_image_with_feature_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_image_with_feature_list" ADD CONSTRAINT "services_blocks_image_with_feature_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_grid_with_anchors_items" ADD CONSTRAINT "services_blocks_services_grid_with_anchors_items_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_services_grid_with_anchors_items" ADD CONSTRAINT "services_blocks_services_grid_with_anchors_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_services_grid_with_anchors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_services_grid_with_anchors" ADD CONSTRAINT "services_blocks_services_grid_with_anchors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_timeline_steps" ADD CONSTRAINT "services_blocks_steps_timeline_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_steps_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_steps_timeline" ADD CONSTRAINT "services_blocks_steps_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_simple_c_t_a" ADD CONSTRAINT "services_blocks_simple_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_detail_section_content" ADD CONSTRAINT "services_blocks_service_detail_section_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service_detail_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_detail_section_pills" ADD CONSTRAINT "services_blocks_service_detail_section_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service_detail_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_detail_section" ADD CONSTRAINT "services_blocks_service_detail_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_service_detail_section" ADD CONSTRAINT "services_blocks_service_detail_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_issues_accordion_items_bullets" ADD CONSTRAINT "services_blocks_issues_accordion_items_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_issues_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_issues_accordion_items" ADD CONSTRAINT "services_blocks_issues_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_issues_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_issues_accordion" ADD CONSTRAINT "services_blocks_issues_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_table_rows" ADD CONSTRAINT "services_blocks_pricing_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_table" ADD CONSTRAINT "services_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_accordion_items" ADD CONSTRAINT "services_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_accordion" ADD CONSTRAINT "services_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_contact_phones" ADD CONSTRAINT "site_settings_contact_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_nav_links" ADD CONSTRAINT "site_settings_header_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_footer_links" ADD CONSTRAINT "site_settings_footer_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_logo_id_media_id_fk" FOREIGN KEY ("general_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_logo_dark_id_media_id_fk" FOREIGN KEY ("general_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_general_favicon_id_media_id_fk" FOREIGN KEY ("general_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_default_og_image_id_media_id_fk" FOREIGN KEY ("seo_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sites_fk" FOREIGN KEY ("sites_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_settings_fk" FOREIGN KEY ("site_settings_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_sites_id_idx" ON "users_rels" USING btree ("sites_id");
  CREATE UNIQUE INDEX "sites_slug_idx" ON "sites" USING btree ("slug");
  CREATE INDEX "sites_logo_idx" ON "sites" USING btree ("logo_id");
  CREATE INDEX "sites_updated_at_idx" ON "sites" USING btree ("updated_at");
  CREATE INDEX "sites_created_at_idx" ON "sites" USING btree ("created_at");
  CREATE INDEX "media_site_idx" ON "media" USING btree ("site_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_pro_badges_order_idx" ON "pages_blocks_hero_pro_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_pro_badges_parent_id_idx" ON "pages_blocks_hero_pro_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_pro_order_idx" ON "pages_blocks_hero_pro" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_pro_parent_id_idx" ON "pages_blocks_hero_pro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_pro_path_idx" ON "pages_blocks_hero_pro" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_hero_order_idx" ON "pages_blocks_video_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_hero_parent_id_idx" ON "pages_blocks_video_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_hero_path_idx" ON "pages_blocks_video_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_hero_poster_idx" ON "pages_blocks_video_hero" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_video_hero_video_idx" ON "pages_blocks_video_hero" USING btree ("video_id");
  CREATE INDEX "pages_blocks_services_cards1_items_order_idx" ON "pages_blocks_services_cards1_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_cards1_items_parent_id_idx" ON "pages_blocks_services_cards1_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_cards1_order_idx" ON "pages_blocks_services_cards1" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_cards1_parent_id_idx" ON "pages_blocks_services_cards1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_cards1_path_idx" ON "pages_blocks_services_cards1" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_cards2_items_order_idx" ON "pages_blocks_services_cards2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_cards2_items_parent_id_idx" ON "pages_blocks_services_cards2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_cards2_order_idx" ON "pages_blocks_services_cards2" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_cards2_parent_id_idx" ON "pages_blocks_services_cards2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_cards2_path_idx" ON "pages_blocks_services_cards2" USING btree ("_path");
  CREATE INDEX "pages_blocks_features2_items_order_idx" ON "pages_blocks_features2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features2_items_parent_id_idx" ON "pages_blocks_features2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features2_order_idx" ON "pages_blocks_features2" USING btree ("_order");
  CREATE INDEX "pages_blocks_features2_parent_id_idx" ON "pages_blocks_features2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features2_path_idx" ON "pages_blocks_features2" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_us1_items_order_idx" ON "pages_blocks_why_us1_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_us1_items_parent_id_idx" ON "pages_blocks_why_us1_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_us1_order_idx" ON "pages_blocks_why_us1" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_us1_parent_id_idx" ON "pages_blocks_why_us1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_us1_path_idx" ON "pages_blocks_why_us1" USING btree ("_path");
  CREATE INDEX "pages_blocks_issues_items_order_idx" ON "pages_blocks_issues_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_issues_items_parent_id_idx" ON "pages_blocks_issues_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_issues_order_idx" ON "pages_blocks_issues" USING btree ("_order");
  CREATE INDEX "pages_blocks_issues_parent_id_idx" ON "pages_blocks_issues" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_issues_path_idx" ON "pages_blocks_issues" USING btree ("_path");
  CREATE INDEX "pages_blocks_repair_steps1_steps_order_idx" ON "pages_blocks_repair_steps1_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_steps1_steps_parent_id_idx" ON "pages_blocks_repair_steps1_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_steps1_order_idx" ON "pages_blocks_repair_steps1" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_steps1_parent_id_idx" ON "pages_blocks_repair_steps1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_steps1_path_idx" ON "pages_blocks_repair_steps1" USING btree ("_path");
  CREATE INDEX "pages_blocks_reviews1_items_order_idx" ON "pages_blocks_reviews1_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews1_items_parent_id_idx" ON "pages_blocks_reviews1_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews1_order_idx" ON "pages_blocks_reviews1" USING btree ("_order");
  CREATE INDEX "pages_blocks_reviews1_parent_id_idx" ON "pages_blocks_reviews1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reviews1_path_idx" ON "pages_blocks_reviews1" USING btree ("_path");
  CREATE INDEX "pages_blocks_repair_special1_bullets_order_idx" ON "pages_blocks_repair_special1_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_special1_bullets_parent_id_idx" ON "pages_blocks_repair_special1_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_special1_side_card_items_order_idx" ON "pages_blocks_repair_special1_side_card_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_special1_side_card_items_parent_id_idx" ON "pages_blocks_repair_special1_side_card_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_special1_order_idx" ON "pages_blocks_repair_special1" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_special1_parent_id_idx" ON "pages_blocks_repair_special1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_special1_path_idx" ON "pages_blocks_repair_special1" USING btree ("_path");
  CREATE INDEX "pages_blocks_repair_special1_background_image_idx" ON "pages_blocks_repair_special1" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_repair_special2_service_list_order_idx" ON "pages_blocks_repair_special2_service_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_special2_service_list_parent_id_idx" ON "pages_blocks_repair_special2_service_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_special2_content_blocks_order_idx" ON "pages_blocks_repair_special2_content_blocks" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_special2_content_blocks_parent_id_idx" ON "pages_blocks_repair_special2_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_special2_process_steps_order_idx" ON "pages_blocks_repair_special2_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_special2_process_steps_parent_id_idx" ON "pages_blocks_repair_special2_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_special2_order_idx" ON "pages_blocks_repair_special2" USING btree ("_order");
  CREATE INDEX "pages_blocks_repair_special2_parent_id_idx" ON "pages_blocks_repair_special2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_repair_special2_path_idx" ON "pages_blocks_repair_special2" USING btree ("_path");
  CREATE INDEX "pages_blocks_repair_special2_hero_image_idx" ON "pages_blocks_repair_special2" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_repair_special2_side_image_idx" ON "pages_blocks_repair_special2" USING btree ("side_image_id");
  CREATE INDEX "pages_blocks_coverage_branches_items_order_idx" ON "pages_blocks_coverage_branches_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_branches_items_parent_id_idx" ON "pages_blocks_coverage_branches_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_areas_served_order_idx" ON "pages_blocks_coverage_areas_served" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_areas_served_parent_id_idx" ON "pages_blocks_coverage_areas_served" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_order_idx" ON "pages_blocks_coverage" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_parent_id_idx" ON "pages_blocks_coverage" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_path_idx" ON "pages_blocks_coverage" USING btree ("_path");
  CREATE INDEX "pages_blocks_coverage_image_idx" ON "pages_blocks_coverage" USING btree ("image_id");
  CREATE INDEX "pages_blocks_branches1_items_order_idx" ON "pages_blocks_branches1_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_branches1_items_parent_id_idx" ON "pages_blocks_branches1_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branches1_order_idx" ON "pages_blocks_branches1" USING btree ("_order");
  CREATE INDEX "pages_blocks_branches1_parent_id_idx" ON "pages_blocks_branches1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branches1_path_idx" ON "pages_blocks_branches1" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact1_order_idx" ON "pages_blocks_contact1" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact1_parent_id_idx" ON "pages_blocks_contact1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact1_path_idx" ON "pages_blocks_contact1" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact2_order_idx" ON "pages_blocks_contact2" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact2_parent_id_idx" ON "pages_blocks_contact2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact2_path_idx" ON "pages_blocks_contact2" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact3_side_card_items_order_idx" ON "pages_blocks_contact3_side_card_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact3_side_card_items_parent_id_idx" ON "pages_blocks_contact3_side_card_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact3_order_idx" ON "pages_blocks_contact3" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact3_parent_id_idx" ON "pages_blocks_contact3" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact3_path_idx" ON "pages_blocks_contact3" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq2_items_order_idx" ON "pages_blocks_faq2_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq2_items_parent_id_idx" ON "pages_blocks_faq2_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq2_aside_items_order_idx" ON "pages_blocks_faq2_aside_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq2_aside_items_parent_id_idx" ON "pages_blocks_faq2_aside_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq2_order_idx" ON "pages_blocks_faq2" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq2_parent_id_idx" ON "pages_blocks_faq2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq2_path_idx" ON "pages_blocks_faq2" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_buttons_order_idx" ON "pages_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_buttons_parent_id_idx" ON "pages_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_landing_hero_image_description_order_idx" ON "pages_blocks_landing_hero_image_description" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_hero_image_description_parent_id_idx" ON "pages_blocks_landing_hero_image_description" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landing_hero_image_pills_order_idx" ON "pages_blocks_landing_hero_image_pills" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_hero_image_pills_parent_id_idx" ON "pages_blocks_landing_hero_image_pills" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landing_hero_image_order_idx" ON "pages_blocks_landing_hero_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_landing_hero_image_parent_id_idx" ON "pages_blocks_landing_hero_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_landing_hero_image_path_idx" ON "pages_blocks_landing_hero_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_landing_hero_image_hero_image_idx" ON "pages_blocks_landing_hero_image" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_coverage_with_branches_description_order_idx" ON "pages_blocks_coverage_with_branches_description" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_with_branches_description_parent_id_idx" ON "pages_blocks_coverage_with_branches_description" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_with_branches_branches_order_idx" ON "pages_blocks_coverage_with_branches_branches" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_with_branches_branches_parent_id_idx" ON "pages_blocks_coverage_with_branches_branches" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_with_branches_order_idx" ON "pages_blocks_coverage_with_branches" USING btree ("_order");
  CREATE INDEX "pages_blocks_coverage_with_branches_parent_id_idx" ON "pages_blocks_coverage_with_branches" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coverage_with_branches_path_idx" ON "pages_blocks_coverage_with_branches" USING btree ("_path");
  CREATE INDEX "pages_blocks_coverage_with_branches_image_idx" ON "pages_blocks_coverage_with_branches" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_with_feature_list_features_order_idx" ON "pages_blocks_image_with_feature_list_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_with_feature_list_features_parent_id_idx" ON "pages_blocks_image_with_feature_list_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_with_feature_list_order_idx" ON "pages_blocks_image_with_feature_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_with_feature_list_parent_id_idx" ON "pages_blocks_image_with_feature_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_with_feature_list_path_idx" ON "pages_blocks_image_with_feature_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_with_feature_list_image_idx" ON "pages_blocks_image_with_feature_list" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_grid_with_anchors_items_order_idx" ON "pages_blocks_services_grid_with_anchors_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_with_anchors_items_parent_id_idx" ON "pages_blocks_services_grid_with_anchors_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_with_anchors_items_icon_image_idx" ON "pages_blocks_services_grid_with_anchors_items" USING btree ("icon_image_id");
  CREATE INDEX "pages_blocks_services_grid_with_anchors_order_idx" ON "pages_blocks_services_grid_with_anchors" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_with_anchors_parent_id_idx" ON "pages_blocks_services_grid_with_anchors" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_with_anchors_path_idx" ON "pages_blocks_services_grid_with_anchors" USING btree ("_path");
  CREATE INDEX "pages_blocks_steps_timeline_steps_order_idx" ON "pages_blocks_steps_timeline_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_timeline_steps_parent_id_idx" ON "pages_blocks_steps_timeline_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_timeline_order_idx" ON "pages_blocks_steps_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_timeline_parent_id_idx" ON "pages_blocks_steps_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_timeline_path_idx" ON "pages_blocks_steps_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_simple_c_t_a_order_idx" ON "pages_blocks_simple_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_c_t_a_parent_id_idx" ON "pages_blocks_simple_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_c_t_a_path_idx" ON "pages_blocks_simple_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_detail_section_content_order_idx" ON "pages_blocks_service_detail_section_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_section_content_parent_id_idx" ON "pages_blocks_service_detail_section_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_section_pills_order_idx" ON "pages_blocks_service_detail_section_pills" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_section_pills_parent_id_idx" ON "pages_blocks_service_detail_section_pills" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_section_order_idx" ON "pages_blocks_service_detail_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_detail_section_parent_id_idx" ON "pages_blocks_service_detail_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_detail_section_path_idx" ON "pages_blocks_service_detail_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_detail_section_image_idx" ON "pages_blocks_service_detail_section" USING btree ("image_id");
  CREATE INDEX "pages_blocks_issues_accordion_items_bullets_order_idx" ON "pages_blocks_issues_accordion_items_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_issues_accordion_items_bullets_parent_id_idx" ON "pages_blocks_issues_accordion_items_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_issues_accordion_items_order_idx" ON "pages_blocks_issues_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_issues_accordion_items_parent_id_idx" ON "pages_blocks_issues_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_issues_accordion_order_idx" ON "pages_blocks_issues_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_issues_accordion_parent_id_idx" ON "pages_blocks_issues_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_issues_accordion_path_idx" ON "pages_blocks_issues_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_table_rows_order_idx" ON "pages_blocks_pricing_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_rows_parent_id_idx" ON "pages_blocks_pricing_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_order_idx" ON "pages_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_parent_id_idx" ON "pages_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_path_idx" ON "pages_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordion_items_order_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_parent_id_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_site_idx" ON "pages" USING btree ("site_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_image_idx" ON "services_blocks_hero" USING btree ("image_id");
  CREATE INDEX "services_blocks_hero_pro_badges_order_idx" ON "services_blocks_hero_pro_badges" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_pro_badges_parent_id_idx" ON "services_blocks_hero_pro_badges" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_pro_order_idx" ON "services_blocks_hero_pro" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_pro_parent_id_idx" ON "services_blocks_hero_pro" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_pro_path_idx" ON "services_blocks_hero_pro" USING btree ("_path");
  CREATE INDEX "services_blocks_video_hero_order_idx" ON "services_blocks_video_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_video_hero_parent_id_idx" ON "services_blocks_video_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_video_hero_path_idx" ON "services_blocks_video_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_video_hero_poster_idx" ON "services_blocks_video_hero" USING btree ("poster_id");
  CREATE INDEX "services_blocks_video_hero_video_idx" ON "services_blocks_video_hero" USING btree ("video_id");
  CREATE INDEX "services_blocks_services_cards1_items_order_idx" ON "services_blocks_services_cards1_items" USING btree ("_order");
  CREATE INDEX "services_blocks_services_cards1_items_parent_id_idx" ON "services_blocks_services_cards1_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_cards1_order_idx" ON "services_blocks_services_cards1" USING btree ("_order");
  CREATE INDEX "services_blocks_services_cards1_parent_id_idx" ON "services_blocks_services_cards1" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_cards1_path_idx" ON "services_blocks_services_cards1" USING btree ("_path");
  CREATE INDEX "services_blocks_services_cards2_items_order_idx" ON "services_blocks_services_cards2_items" USING btree ("_order");
  CREATE INDEX "services_blocks_services_cards2_items_parent_id_idx" ON "services_blocks_services_cards2_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_cards2_order_idx" ON "services_blocks_services_cards2" USING btree ("_order");
  CREATE INDEX "services_blocks_services_cards2_parent_id_idx" ON "services_blocks_services_cards2" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_cards2_path_idx" ON "services_blocks_services_cards2" USING btree ("_path");
  CREATE INDEX "services_blocks_features2_items_order_idx" ON "services_blocks_features2_items" USING btree ("_order");
  CREATE INDEX "services_blocks_features2_items_parent_id_idx" ON "services_blocks_features2_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_features2_order_idx" ON "services_blocks_features2" USING btree ("_order");
  CREATE INDEX "services_blocks_features2_parent_id_idx" ON "services_blocks_features2" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_features2_path_idx" ON "services_blocks_features2" USING btree ("_path");
  CREATE INDEX "services_blocks_why_us1_items_order_idx" ON "services_blocks_why_us1_items" USING btree ("_order");
  CREATE INDEX "services_blocks_why_us1_items_parent_id_idx" ON "services_blocks_why_us1_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_why_us1_order_idx" ON "services_blocks_why_us1" USING btree ("_order");
  CREATE INDEX "services_blocks_why_us1_parent_id_idx" ON "services_blocks_why_us1" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_why_us1_path_idx" ON "services_blocks_why_us1" USING btree ("_path");
  CREATE INDEX "services_blocks_issues_items_order_idx" ON "services_blocks_issues_items" USING btree ("_order");
  CREATE INDEX "services_blocks_issues_items_parent_id_idx" ON "services_blocks_issues_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_issues_order_idx" ON "services_blocks_issues" USING btree ("_order");
  CREATE INDEX "services_blocks_issues_parent_id_idx" ON "services_blocks_issues" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_issues_path_idx" ON "services_blocks_issues" USING btree ("_path");
  CREATE INDEX "services_blocks_repair_steps1_steps_order_idx" ON "services_blocks_repair_steps1_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_steps1_steps_parent_id_idx" ON "services_blocks_repair_steps1_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_steps1_order_idx" ON "services_blocks_repair_steps1" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_steps1_parent_id_idx" ON "services_blocks_repair_steps1" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_steps1_path_idx" ON "services_blocks_repair_steps1" USING btree ("_path");
  CREATE INDEX "services_blocks_reviews1_items_order_idx" ON "services_blocks_reviews1_items" USING btree ("_order");
  CREATE INDEX "services_blocks_reviews1_items_parent_id_idx" ON "services_blocks_reviews1_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_reviews1_order_idx" ON "services_blocks_reviews1" USING btree ("_order");
  CREATE INDEX "services_blocks_reviews1_parent_id_idx" ON "services_blocks_reviews1" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_reviews1_path_idx" ON "services_blocks_reviews1" USING btree ("_path");
  CREATE INDEX "services_blocks_repair_special1_bullets_order_idx" ON "services_blocks_repair_special1_bullets" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_special1_bullets_parent_id_idx" ON "services_blocks_repair_special1_bullets" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_special1_side_card_items_order_idx" ON "services_blocks_repair_special1_side_card_items" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_special1_side_card_items_parent_id_idx" ON "services_blocks_repair_special1_side_card_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_special1_order_idx" ON "services_blocks_repair_special1" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_special1_parent_id_idx" ON "services_blocks_repair_special1" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_special1_path_idx" ON "services_blocks_repair_special1" USING btree ("_path");
  CREATE INDEX "services_blocks_repair_special1_background_image_idx" ON "services_blocks_repair_special1" USING btree ("background_image_id");
  CREATE INDEX "services_blocks_repair_special2_service_list_order_idx" ON "services_blocks_repair_special2_service_list" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_special2_service_list_parent_id_idx" ON "services_blocks_repair_special2_service_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_special2_content_blocks_order_idx" ON "services_blocks_repair_special2_content_blocks" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_special2_content_blocks_parent_id_idx" ON "services_blocks_repair_special2_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_special2_process_steps_order_idx" ON "services_blocks_repair_special2_process_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_special2_process_steps_parent_id_idx" ON "services_blocks_repair_special2_process_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_special2_order_idx" ON "services_blocks_repair_special2" USING btree ("_order");
  CREATE INDEX "services_blocks_repair_special2_parent_id_idx" ON "services_blocks_repair_special2" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_repair_special2_path_idx" ON "services_blocks_repair_special2" USING btree ("_path");
  CREATE INDEX "services_blocks_repair_special2_hero_image_idx" ON "services_blocks_repair_special2" USING btree ("hero_image_id");
  CREATE INDEX "services_blocks_repair_special2_side_image_idx" ON "services_blocks_repair_special2" USING btree ("side_image_id");
  CREATE INDEX "services_blocks_coverage_branches_items_order_idx" ON "services_blocks_coverage_branches_items" USING btree ("_order");
  CREATE INDEX "services_blocks_coverage_branches_items_parent_id_idx" ON "services_blocks_coverage_branches_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_coverage_areas_served_order_idx" ON "services_blocks_coverage_areas_served" USING btree ("_order");
  CREATE INDEX "services_blocks_coverage_areas_served_parent_id_idx" ON "services_blocks_coverage_areas_served" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_coverage_order_idx" ON "services_blocks_coverage" USING btree ("_order");
  CREATE INDEX "services_blocks_coverage_parent_id_idx" ON "services_blocks_coverage" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_coverage_path_idx" ON "services_blocks_coverage" USING btree ("_path");
  CREATE INDEX "services_blocks_coverage_image_idx" ON "services_blocks_coverage" USING btree ("image_id");
  CREATE INDEX "services_blocks_branches1_items_order_idx" ON "services_blocks_branches1_items" USING btree ("_order");
  CREATE INDEX "services_blocks_branches1_items_parent_id_idx" ON "services_blocks_branches1_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_branches1_order_idx" ON "services_blocks_branches1" USING btree ("_order");
  CREATE INDEX "services_blocks_branches1_parent_id_idx" ON "services_blocks_branches1" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_branches1_path_idx" ON "services_blocks_branches1" USING btree ("_path");
  CREATE INDEX "services_blocks_contact1_order_idx" ON "services_blocks_contact1" USING btree ("_order");
  CREATE INDEX "services_blocks_contact1_parent_id_idx" ON "services_blocks_contact1" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact1_path_idx" ON "services_blocks_contact1" USING btree ("_path");
  CREATE INDEX "services_blocks_contact2_order_idx" ON "services_blocks_contact2" USING btree ("_order");
  CREATE INDEX "services_blocks_contact2_parent_id_idx" ON "services_blocks_contact2" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact2_path_idx" ON "services_blocks_contact2" USING btree ("_path");
  CREATE INDEX "services_blocks_contact3_side_card_items_order_idx" ON "services_blocks_contact3_side_card_items" USING btree ("_order");
  CREATE INDEX "services_blocks_contact3_side_card_items_parent_id_idx" ON "services_blocks_contact3_side_card_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact3_order_idx" ON "services_blocks_contact3" USING btree ("_order");
  CREATE INDEX "services_blocks_contact3_parent_id_idx" ON "services_blocks_contact3" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_contact3_path_idx" ON "services_blocks_contact3" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_items_order_idx" ON "services_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_items_parent_id_idx" ON "services_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_order_idx" ON "services_blocks_faq" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_parent_id_idx" ON "services_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_path_idx" ON "services_blocks_faq" USING btree ("_path");
  CREATE INDEX "services_blocks_faq2_items_order_idx" ON "services_blocks_faq2_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq2_items_parent_id_idx" ON "services_blocks_faq2_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq2_aside_items_order_idx" ON "services_blocks_faq2_aside_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq2_aside_items_parent_id_idx" ON "services_blocks_faq2_aside_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq2_order_idx" ON "services_blocks_faq2" USING btree ("_order");
  CREATE INDEX "services_blocks_faq2_parent_id_idx" ON "services_blocks_faq2" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq2_path_idx" ON "services_blocks_faq2" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_buttons_order_idx" ON "services_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_buttons_parent_id_idx" ON "services_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_landing_hero_image_description_order_idx" ON "services_blocks_landing_hero_image_description" USING btree ("_order");
  CREATE INDEX "services_blocks_landing_hero_image_description_parent_id_idx" ON "services_blocks_landing_hero_image_description" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_landing_hero_image_pills_order_idx" ON "services_blocks_landing_hero_image_pills" USING btree ("_order");
  CREATE INDEX "services_blocks_landing_hero_image_pills_parent_id_idx" ON "services_blocks_landing_hero_image_pills" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_landing_hero_image_order_idx" ON "services_blocks_landing_hero_image" USING btree ("_order");
  CREATE INDEX "services_blocks_landing_hero_image_parent_id_idx" ON "services_blocks_landing_hero_image" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_landing_hero_image_path_idx" ON "services_blocks_landing_hero_image" USING btree ("_path");
  CREATE INDEX "services_blocks_landing_hero_image_hero_image_idx" ON "services_blocks_landing_hero_image" USING btree ("hero_image_id");
  CREATE INDEX "services_blocks_coverage_with_branches_description_order_idx" ON "services_blocks_coverage_with_branches_description" USING btree ("_order");
  CREATE INDEX "services_blocks_coverage_with_branches_description_parent_id_idx" ON "services_blocks_coverage_with_branches_description" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_coverage_with_branches_branches_order_idx" ON "services_blocks_coverage_with_branches_branches" USING btree ("_order");
  CREATE INDEX "services_blocks_coverage_with_branches_branches_parent_id_idx" ON "services_blocks_coverage_with_branches_branches" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_coverage_with_branches_order_idx" ON "services_blocks_coverage_with_branches" USING btree ("_order");
  CREATE INDEX "services_blocks_coverage_with_branches_parent_id_idx" ON "services_blocks_coverage_with_branches" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_coverage_with_branches_path_idx" ON "services_blocks_coverage_with_branches" USING btree ("_path");
  CREATE INDEX "services_blocks_coverage_with_branches_image_idx" ON "services_blocks_coverage_with_branches" USING btree ("image_id");
  CREATE INDEX "services_blocks_image_with_feature_list_features_order_idx" ON "services_blocks_image_with_feature_list_features" USING btree ("_order");
  CREATE INDEX "services_blocks_image_with_feature_list_features_parent_id_idx" ON "services_blocks_image_with_feature_list_features" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_with_feature_list_order_idx" ON "services_blocks_image_with_feature_list" USING btree ("_order");
  CREATE INDEX "services_blocks_image_with_feature_list_parent_id_idx" ON "services_blocks_image_with_feature_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_with_feature_list_path_idx" ON "services_blocks_image_with_feature_list" USING btree ("_path");
  CREATE INDEX "services_blocks_image_with_feature_list_image_idx" ON "services_blocks_image_with_feature_list" USING btree ("image_id");
  CREATE INDEX "services_blocks_services_grid_with_anchors_items_order_idx" ON "services_blocks_services_grid_with_anchors_items" USING btree ("_order");
  CREATE INDEX "services_blocks_services_grid_with_anchors_items_parent_id_idx" ON "services_blocks_services_grid_with_anchors_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_grid_with_anchors_items_icon_im_idx" ON "services_blocks_services_grid_with_anchors_items" USING btree ("icon_image_id");
  CREATE INDEX "services_blocks_services_grid_with_anchors_order_idx" ON "services_blocks_services_grid_with_anchors" USING btree ("_order");
  CREATE INDEX "services_blocks_services_grid_with_anchors_parent_id_idx" ON "services_blocks_services_grid_with_anchors" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_services_grid_with_anchors_path_idx" ON "services_blocks_services_grid_with_anchors" USING btree ("_path");
  CREATE INDEX "services_blocks_steps_timeline_steps_order_idx" ON "services_blocks_steps_timeline_steps" USING btree ("_order");
  CREATE INDEX "services_blocks_steps_timeline_steps_parent_id_idx" ON "services_blocks_steps_timeline_steps" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_timeline_order_idx" ON "services_blocks_steps_timeline" USING btree ("_order");
  CREATE INDEX "services_blocks_steps_timeline_parent_id_idx" ON "services_blocks_steps_timeline" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_steps_timeline_path_idx" ON "services_blocks_steps_timeline" USING btree ("_path");
  CREATE INDEX "services_blocks_simple_c_t_a_order_idx" ON "services_blocks_simple_c_t_a" USING btree ("_order");
  CREATE INDEX "services_blocks_simple_c_t_a_parent_id_idx" ON "services_blocks_simple_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_simple_c_t_a_path_idx" ON "services_blocks_simple_c_t_a" USING btree ("_path");
  CREATE INDEX "services_blocks_service_detail_section_content_order_idx" ON "services_blocks_service_detail_section_content" USING btree ("_order");
  CREATE INDEX "services_blocks_service_detail_section_content_parent_id_idx" ON "services_blocks_service_detail_section_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_detail_section_pills_order_idx" ON "services_blocks_service_detail_section_pills" USING btree ("_order");
  CREATE INDEX "services_blocks_service_detail_section_pills_parent_id_idx" ON "services_blocks_service_detail_section_pills" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_detail_section_order_idx" ON "services_blocks_service_detail_section" USING btree ("_order");
  CREATE INDEX "services_blocks_service_detail_section_parent_id_idx" ON "services_blocks_service_detail_section" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_detail_section_path_idx" ON "services_blocks_service_detail_section" USING btree ("_path");
  CREATE INDEX "services_blocks_service_detail_section_image_idx" ON "services_blocks_service_detail_section" USING btree ("image_id");
  CREATE INDEX "services_blocks_issues_accordion_items_bullets_order_idx" ON "services_blocks_issues_accordion_items_bullets" USING btree ("_order");
  CREATE INDEX "services_blocks_issues_accordion_items_bullets_parent_id_idx" ON "services_blocks_issues_accordion_items_bullets" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_issues_accordion_items_order_idx" ON "services_blocks_issues_accordion_items" USING btree ("_order");
  CREATE INDEX "services_blocks_issues_accordion_items_parent_id_idx" ON "services_blocks_issues_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_issues_accordion_order_idx" ON "services_blocks_issues_accordion" USING btree ("_order");
  CREATE INDEX "services_blocks_issues_accordion_parent_id_idx" ON "services_blocks_issues_accordion" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_issues_accordion_path_idx" ON "services_blocks_issues_accordion" USING btree ("_path");
  CREATE INDEX "services_blocks_pricing_table_rows_order_idx" ON "services_blocks_pricing_table_rows" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_table_rows_parent_id_idx" ON "services_blocks_pricing_table_rows" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_table_order_idx" ON "services_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_table_parent_id_idx" ON "services_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_table_path_idx" ON "services_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_accordion_items_order_idx" ON "services_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_accordion_items_parent_id_idx" ON "services_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_accordion_order_idx" ON "services_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_accordion_parent_id_idx" ON "services_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_accordion_path_idx" ON "services_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "services_site_idx" ON "services" USING btree ("site_id");
  CREATE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "posts_site_idx" ON "posts" USING btree ("site_id");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_published_at_idx" ON "posts" USING btree ("published_at");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "categories_site_idx" ON "categories" USING btree ("site_id");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "site_settings_contact_phones_order_idx" ON "site_settings_contact_phones" USING btree ("_order");
  CREATE INDEX "site_settings_contact_phones_parent_id_idx" ON "site_settings_contact_phones" USING btree ("_parent_id");
  CREATE INDEX "site_settings_header_nav_links_order_idx" ON "site_settings_header_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_header_nav_links_parent_id_idx" ON "site_settings_header_nav_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_footer_links_order_idx" ON "site_settings_footer_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_footer_links_parent_id_idx" ON "site_settings_footer_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_site_idx" ON "site_settings" USING btree ("site_id");
  CREATE INDEX "site_settings_general_general_logo_idx" ON "site_settings" USING btree ("general_logo_id");
  CREATE INDEX "site_settings_general_general_logo_dark_idx" ON "site_settings" USING btree ("general_logo_dark_id");
  CREATE INDEX "site_settings_general_general_favicon_idx" ON "site_settings" USING btree ("general_favicon_id");
  CREATE INDEX "site_settings_seo_seo_default_og_image_idx" ON "site_settings" USING btree ("seo_default_og_image_id");
  CREATE INDEX "site_settings_updated_at_idx" ON "site_settings" USING btree ("updated_at");
  CREATE INDEX "site_settings_created_at_idx" ON "site_settings" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_sites_id_idx" ON "payload_locked_documents_rels" USING btree ("sites_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_site_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("site_settings_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "sites" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_pro_badges" CASCADE;
  DROP TABLE "pages_blocks_hero_pro" CASCADE;
  DROP TABLE "pages_blocks_video_hero" CASCADE;
  DROP TABLE "pages_blocks_services_cards1_items" CASCADE;
  DROP TABLE "pages_blocks_services_cards1" CASCADE;
  DROP TABLE "pages_blocks_services_cards2_items" CASCADE;
  DROP TABLE "pages_blocks_services_cards2" CASCADE;
  DROP TABLE "pages_blocks_features2_items" CASCADE;
  DROP TABLE "pages_blocks_features2" CASCADE;
  DROP TABLE "pages_blocks_why_us1_items" CASCADE;
  DROP TABLE "pages_blocks_why_us1" CASCADE;
  DROP TABLE "pages_blocks_issues_items" CASCADE;
  DROP TABLE "pages_blocks_issues" CASCADE;
  DROP TABLE "pages_blocks_repair_steps1_steps" CASCADE;
  DROP TABLE "pages_blocks_repair_steps1" CASCADE;
  DROP TABLE "pages_blocks_reviews1_items" CASCADE;
  DROP TABLE "pages_blocks_reviews1" CASCADE;
  DROP TABLE "pages_blocks_repair_special1_bullets" CASCADE;
  DROP TABLE "pages_blocks_repair_special1_side_card_items" CASCADE;
  DROP TABLE "pages_blocks_repair_special1" CASCADE;
  DROP TABLE "pages_blocks_repair_special2_service_list" CASCADE;
  DROP TABLE "pages_blocks_repair_special2_content_blocks" CASCADE;
  DROP TABLE "pages_blocks_repair_special2_process_steps" CASCADE;
  DROP TABLE "pages_blocks_repair_special2" CASCADE;
  DROP TABLE "pages_blocks_coverage_branches_items" CASCADE;
  DROP TABLE "pages_blocks_coverage_areas_served" CASCADE;
  DROP TABLE "pages_blocks_coverage" CASCADE;
  DROP TABLE "pages_blocks_branches1_items" CASCADE;
  DROP TABLE "pages_blocks_branches1" CASCADE;
  DROP TABLE "pages_blocks_contact1" CASCADE;
  DROP TABLE "pages_blocks_contact2" CASCADE;
  DROP TABLE "pages_blocks_contact3_side_card_items" CASCADE;
  DROP TABLE "pages_blocks_contact3" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq2_items" CASCADE;
  DROP TABLE "pages_blocks_faq2_aside_items" CASCADE;
  DROP TABLE "pages_blocks_faq2" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_landing_hero_image_description" CASCADE;
  DROP TABLE "pages_blocks_landing_hero_image_pills" CASCADE;
  DROP TABLE "pages_blocks_landing_hero_image" CASCADE;
  DROP TABLE "pages_blocks_coverage_with_branches_description" CASCADE;
  DROP TABLE "pages_blocks_coverage_with_branches_branches" CASCADE;
  DROP TABLE "pages_blocks_coverage_with_branches" CASCADE;
  DROP TABLE "pages_blocks_image_with_feature_list_features" CASCADE;
  DROP TABLE "pages_blocks_image_with_feature_list" CASCADE;
  DROP TABLE "pages_blocks_services_grid_with_anchors_items" CASCADE;
  DROP TABLE "pages_blocks_services_grid_with_anchors" CASCADE;
  DROP TABLE "pages_blocks_steps_timeline_steps" CASCADE;
  DROP TABLE "pages_blocks_steps_timeline" CASCADE;
  DROP TABLE "pages_blocks_simple_c_t_a" CASCADE;
  DROP TABLE "pages_blocks_service_detail_section_content" CASCADE;
  DROP TABLE "pages_blocks_service_detail_section_pills" CASCADE;
  DROP TABLE "pages_blocks_service_detail_section" CASCADE;
  DROP TABLE "pages_blocks_issues_accordion_items_bullets" CASCADE;
  DROP TABLE "pages_blocks_issues_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_issues_accordion" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_rows" CASCADE;
  DROP TABLE "pages_blocks_pricing_table" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_hero_pro_badges" CASCADE;
  DROP TABLE "services_blocks_hero_pro" CASCADE;
  DROP TABLE "services_blocks_video_hero" CASCADE;
  DROP TABLE "services_blocks_services_cards1_items" CASCADE;
  DROP TABLE "services_blocks_services_cards1" CASCADE;
  DROP TABLE "services_blocks_services_cards2_items" CASCADE;
  DROP TABLE "services_blocks_services_cards2" CASCADE;
  DROP TABLE "services_blocks_features2_items" CASCADE;
  DROP TABLE "services_blocks_features2" CASCADE;
  DROP TABLE "services_blocks_why_us1_items" CASCADE;
  DROP TABLE "services_blocks_why_us1" CASCADE;
  DROP TABLE "services_blocks_issues_items" CASCADE;
  DROP TABLE "services_blocks_issues" CASCADE;
  DROP TABLE "services_blocks_repair_steps1_steps" CASCADE;
  DROP TABLE "services_blocks_repair_steps1" CASCADE;
  DROP TABLE "services_blocks_reviews1_items" CASCADE;
  DROP TABLE "services_blocks_reviews1" CASCADE;
  DROP TABLE "services_blocks_repair_special1_bullets" CASCADE;
  DROP TABLE "services_blocks_repair_special1_side_card_items" CASCADE;
  DROP TABLE "services_blocks_repair_special1" CASCADE;
  DROP TABLE "services_blocks_repair_special2_service_list" CASCADE;
  DROP TABLE "services_blocks_repair_special2_content_blocks" CASCADE;
  DROP TABLE "services_blocks_repair_special2_process_steps" CASCADE;
  DROP TABLE "services_blocks_repair_special2" CASCADE;
  DROP TABLE "services_blocks_coverage_branches_items" CASCADE;
  DROP TABLE "services_blocks_coverage_areas_served" CASCADE;
  DROP TABLE "services_blocks_coverage" CASCADE;
  DROP TABLE "services_blocks_branches1_items" CASCADE;
  DROP TABLE "services_blocks_branches1" CASCADE;
  DROP TABLE "services_blocks_contact1" CASCADE;
  DROP TABLE "services_blocks_contact2" CASCADE;
  DROP TABLE "services_blocks_contact3_side_card_items" CASCADE;
  DROP TABLE "services_blocks_contact3" CASCADE;
  DROP TABLE "services_blocks_faq_items" CASCADE;
  DROP TABLE "services_blocks_faq" CASCADE;
  DROP TABLE "services_blocks_faq2_items" CASCADE;
  DROP TABLE "services_blocks_faq2_aside_items" CASCADE;
  DROP TABLE "services_blocks_faq2" CASCADE;
  DROP TABLE "services_blocks_cta_buttons" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_landing_hero_image_description" CASCADE;
  DROP TABLE "services_blocks_landing_hero_image_pills" CASCADE;
  DROP TABLE "services_blocks_landing_hero_image" CASCADE;
  DROP TABLE "services_blocks_coverage_with_branches_description" CASCADE;
  DROP TABLE "services_blocks_coverage_with_branches_branches" CASCADE;
  DROP TABLE "services_blocks_coverage_with_branches" CASCADE;
  DROP TABLE "services_blocks_image_with_feature_list_features" CASCADE;
  DROP TABLE "services_blocks_image_with_feature_list" CASCADE;
  DROP TABLE "services_blocks_services_grid_with_anchors_items" CASCADE;
  DROP TABLE "services_blocks_services_grid_with_anchors" CASCADE;
  DROP TABLE "services_blocks_steps_timeline_steps" CASCADE;
  DROP TABLE "services_blocks_steps_timeline" CASCADE;
  DROP TABLE "services_blocks_simple_c_t_a" CASCADE;
  DROP TABLE "services_blocks_service_detail_section_content" CASCADE;
  DROP TABLE "services_blocks_service_detail_section_pills" CASCADE;
  DROP TABLE "services_blocks_service_detail_section" CASCADE;
  DROP TABLE "services_blocks_issues_accordion_items_bullets" CASCADE;
  DROP TABLE "services_blocks_issues_accordion_items" CASCADE;
  DROP TABLE "services_blocks_issues_accordion" CASCADE;
  DROP TABLE "services_blocks_pricing_table_rows" CASCADE;
  DROP TABLE "services_blocks_pricing_table" CASCADE;
  DROP TABLE "services_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "services_blocks_faq_accordion" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "site_settings_contact_phones" CASCADE;
  DROP TABLE "site_settings_header_nav_links" CASCADE;
  DROP TABLE "site_settings_footer_footer_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_media_kind";
  DROP TYPE "public"."enum_pages_blocks_hero_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_hero_pro_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_video_hero_preload";
  DROP TYPE "public"."enum_pages_blocks_features2_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_issues_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_coverage_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_branches1_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_contact1_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_contact2_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_contact3_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_faq_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_faq2_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_cta_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_landing_hero_image_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_coverage_with_branches_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_image_with_feature_list_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_service_detail_section_layout";
  DROP TYPE "public"."enum_pages_blocks_issues_accordion_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_theme_color_mode";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_theme_color_mode";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum_services_blocks_hero_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_hero_pro_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_video_hero_preload";
  DROP TYPE "public"."enum_services_blocks_features2_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_issues_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_coverage_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_branches1_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_contact1_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_contact2_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_contact3_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_faq_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_faq2_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_cta_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_landing_hero_image_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_coverage_with_branches_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_image_with_feature_list_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_service_detail_section_layout";
  DROP TYPE "public"."enum_services_blocks_issues_accordion_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_pricing_table_theme_color_mode";
  DROP TYPE "public"."enum_services_blocks_faq_accordion_theme_color_mode";`)
}
