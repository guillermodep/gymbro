import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper functions for common operations

// Auth helpers
export const authHelpers = {
  // Sign up new user
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: undefined // No email confirmation required
      }
    })
    return { data, error }
  },

  // Sign in user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Gym helpers
export const gymHelpers = {
  // Get all gyms
  getAllGyms: async () => {
    const { data, error } = await supabase
      .from('gyms')
      .select('*')
      .order('rating', { ascending: false })
    return { data, error }
  },

  // Get gym by ID
  getGymById: async (id) => {
    const { data, error } = await supabase
      .from('gyms')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Get featured gyms
  getFeaturedGyms: async () => {
    const { data, error } = await supabase
      .from('gyms')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false })
    return { data, error }
  },

  // Search gyms
  searchGyms: async (filters = {}) => {
    let query = supabase.from('gyms').select('*')

    if (filters.city) {
      query = query.ilike('location', `%${filters.city}%`)
    }

    if (filters.activity) {
      query = query.contains('activities', [filters.activity])
    }

    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice)
    }

    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }

    const { data, error } = await query.order('rating', { ascending: false })
    return { data, error }
  }
}

// Booking helpers
export const bookingHelpers = {
  // Create booking
  createBooking: async (bookingData) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single()
    return { data, error }
  },

  // Get user bookings
  getUserBookings: async (userId) => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        gyms (*)
      `)
      .eq('user_id', userId)
      .order('booking_date', { ascending: false })
    return { data, error }
  },

  // Get gym bookings
  getGymBookings: async (gymId) => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users (*)
      `)
      .eq('gym_id', gymId)
      .order('booking_date', { ascending: false })
    return { data, error }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status) => {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single()
    return { data, error }
  }
}

// Membership helpers
export const membershipHelpers = {
  // Get user membership
  getUserMembership: async (userId) => {
    const { data, error } = await supabase
      .from('memberships')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()
    return { data, error }
  },

  // Create membership
  createMembership: async (membershipData) => {
    const { data, error } = await supabase
      .from('memberships')
      .insert([membershipData])
      .select()
      .single()
    return { data, error }
  },

  // Update membership
  updateMembership: async (membershipId, updates) => {
    const { data, error } = await supabase
      .from('memberships')
      .update(updates)
      .eq('id', membershipId)
      .select()
      .single()
    return { data, error }
  }
}

// Review helpers
export const reviewHelpers = {
  // Get gym reviews
  getGymReviews: async (gymId) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users (name, email)
      `)
      .eq('gym_id', gymId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Create review
  createReview: async (reviewData) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single()
    return { data, error }
  },

  // Check if user can review
  canUserReview: async (userId, gymId) => {
    // Check if user has completed booking
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('id')
      .eq('user_id', userId)
      .eq('gym_id', gymId)
      .eq('status', 'completed')

    if (bookingError) return { canReview: false, error: bookingError }

    // Check if user already reviewed
    const { data: reviews, error: reviewError } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .eq('gym_id', gymId)

    if (reviewError) return { canReview: false, error: reviewError }

    return { 
      canReview: bookings && bookings.length > 0 && (!reviews || reviews.length === 0),
      error: null 
    }
  }
}

export default supabase
