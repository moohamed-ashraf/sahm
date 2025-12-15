const db = require('../config/db');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private/Admin
 */
const getDashboardStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.user_role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    // Get total users
    const [usersResult] = await db.query('SELECT COUNT(*) as count FROM User');
    const totalUsers = usersResult[0].count;

    // Get users by role
    const [usersByRole] = await db.query(`
      SELECT user_role, COUNT(*) as count 
      FROM User 
      GROUP BY user_role
    `);
    
    const totalInvestors = usersByRole.find((r) => r.user_role === 'investor')?.count || 0;
    const totalEntrepreneurs = usersByRole.find((r) => r.user_role === 'entrepreneur')?.count || 0;

    // Get total companies
    const [companiesResult] = await db.query('SELECT COUNT(*) as count FROM Company');
    const totalCompanies = companiesResult[0].count;

    // Get total projects
    const [projectsResult] = await db.query('SELECT COUNT(*) as count FROM Project');
    const totalProjects = projectsResult[0].count;

    // Get projects by status
    const [projectsByStatus] = await db.query(`
      SELECT project_status, COUNT(*) as count 
      FROM Project 
      GROUP BY project_status
    `);
    
    const activeProjects = projectsByStatus.find((p) => p.project_status === 'active')?.count || 0;
    const completedProjects = projectsByStatus.find((p) => p.project_status === 'completed')?.count || 0;

    // Get total investments
    const [investmentsResult] = await db.query('SELECT COUNT(*) as count FROM Investment');
    const totalInvestments = investmentsResult[0].count;

    // Get total revenue (sum of all investment amounts)
    const [revenueResult] = await db.query('SELECT COALESCE(SUM(investment_amount), 0) as total FROM Investment');
    const totalRevenue = revenueResult[0].total || 0;

    res.status(200).json({
      totalUsers,
      totalCompanies,
      totalProjects,
      totalInvestments,
      totalRevenue: parseFloat(totalRevenue),
      activeProjects,
      completedProjects,
      totalInvestors,
      totalEntrepreneurs
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDashboardStats
};

