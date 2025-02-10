


class GameLogic:
    def __init__(self, watched_videos=0, total_xp=0):
        self.total_xp = self.calculate_xp()
        self.level = self.determine_level()
    
    def calculate_xp(self):

        return
    
    def determine_level(self, total_xp):

        level = 1
        xp_needed = 100
        increment = 50

        while total_xp >= xp_needed:
            total_xp -= xp_needed
            level += 1
            xp_needed += increment

        return level, (xp_needed - total_xp)