# Xaf Mobile E-Commerce

## Project Setup
- Database: Supabase with RLS policies
- Deployment: Vercel
- CI/CD: GitHub Actions
- Storage: Supabase Storage buckets for product images

## Scripts
- `scripts/setup-storage.sh` - Configure Supabase storage buckets
- `scripts/apply-migrations.sql` - Database schema migrations

## Environment Variables
See `credentials/.env` for all required tokens.

## Deployment
Connected to Vercel project: `prj_jgfWKzwzklmoNflYdHbFQl2crwQj`

## Database Schema
- Products with categories, ratings, stock
- User profiles and authentication
- Orders and order items
- Cart management
- Reviews and wishlist

## RLS Policies
All tables have Row Level Security enabled with appropriate policies for public/anonymous/authenticated access.
