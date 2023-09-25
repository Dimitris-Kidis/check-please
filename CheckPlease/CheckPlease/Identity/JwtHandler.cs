using CheckPlease.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CheckPlease.Identity
{
    public class JwtHandler
    {
        private readonly IConfiguration _configuration;
        private readonly IConfigurationSection _jwtSettings;
        public JwtHandler(IConfiguration configuration)
        {
            _configuration = configuration;
            _jwtSettings = _configuration.GetSection("JwtSettings");
        }
        public SigningCredentials GetSigningCredentials()
        {
            var key = AuthOptions.GetSymmetricSecurityKey();
            return new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        }
        public List<Claim> GetClaims(IdentityUser user)
        {
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Email, user.Email),
            //new Claim(ClaimTypes.Name, user.Email),
            
            };
            return claims;
        }
        public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var tokenOptions = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(AuthOptions.LIFETIME)),
                signingCredentials: signingCredentials);
            return tokenOptions;
        }
    }
}
