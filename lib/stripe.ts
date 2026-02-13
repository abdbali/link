import Stripe from 'stripe';
import { env } from '@/lib/env';

// Stripe SDK kendi default API versiyonunu tip-güvenli biçimde kullanır.
export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
