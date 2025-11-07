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
  // Check availability for a specific date/time
  checkAvailability: async (gymId, bookingDate, bookingTime) => {
    try {
      // Get gym capacity
      const { data: gym, error: gymError } = await supabase
        .from('gyms')
        .select('capacity')
        .eq('id', gymId)
        .single()

      if (gymError) throw gymError

      // Count existing bookings for that date/time
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id')
        .eq('gym_id', gymId)
        .eq('booking_date', bookingDate)
        .eq('booking_time', bookingTime)
        .in('status', ['confirmed', 'pending'])

      if (bookingsError) throw bookingsError

      const availableSpots = gym.capacity - (bookings?.length || 0)
      
      return { 
        available: availableSpots > 0, 
        availableSpots,
        capacity: gym.capacity,
        error: null 
      }
    } catch (error) {
      return { available: false, availableSpots: 0, capacity: 0, error }
    }
  },

  // Create booking with validation
  createBooking: async (bookingData) => {
    try {
      // Check availability first
      const availability = await bookingHelpers.checkAvailability(
        bookingData.gym_id,
        bookingData.booking_date,
        bookingData.booking_time
      )

      if (!availability.available) {
        return { 
          data: null, 
          error: { message: 'No hay disponibilidad para esta fecha y hora' } 
        }
      }

      // Create booking
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          ...bookingData,
          status: 'confirmed'
        }])
        .select(`
          *,
          gyms (*)
        `)
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get user bookings (upcoming and past)
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

  // Get upcoming user bookings
  getUpcomingBookings: async (userId) => {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        gyms (*)
      `)
      .eq('user_id', userId)
      .gte('booking_date', today)
      .in('status', ['confirmed', 'pending'])
      .order('booking_date', { ascending: true })
    return { data, error }
  },

  // Get past user bookings
  getPastBookings: async (userId) => {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        gyms (*)
      `)
      .eq('user_id', userId)
      .lt('booking_date', today)
      .order('booking_date', { ascending: false })
    return { data, error }
  },

  // Get gym bookings
  getGymBookings: async (gymId, date = null) => {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        users (name, email)
      `)
      .eq('gym_id', gymId)

    if (date) {
      query = query.eq('booking_date', date)
    }

    const { data, error } = await query
      .order('booking_date', { ascending: false })
      .order('booking_time', { ascending: true })

    return { data, error }
  },

  // Cancel booking
  cancelBooking: async (bookingId, userId) => {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .eq('user_id', userId) // Ensure user owns the booking
      .select()
      .single()
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
