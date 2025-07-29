import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  height: string;
  weight: string;
  age: number;
  ranking: number;
  adp: number; // Average Draft Position
  stats: {
    ppg: number;
    rpg: number;
    apg: number;
    fg_percentage: number;
    fantasy_points: number;
  };
}

interface PlayerCardProps {
  player: Player;
  isDrafted?: boolean;
  onDraft?: (player: Player) => void;
}

export function PlayerCard({ player, isDrafted = false, onDraft }: PlayerCardProps) {
  const getPositionColor = (position: string) => {
    const colors = {
      'PG': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'SG': 'bg-green-500/20 text-green-400 border-green-500/30',
      'SF': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'PF': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'C': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[position as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className={`group relative overflow-hidden bg-gradient-card border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-glow ${isDrafted ? 'opacity-50' : 'hover:-translate-y-1'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {player.name}
            </h3>
            <p className="text-sm text-muted-foreground">{player.team}</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-xs mb-1">
              #{player.ranking}
            </Badge>
            <Badge className={`text-xs border ${getPositionColor(player.position)}`}>
              {player.position}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Height</p>
            <p className="font-medium">{player.height}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Weight</p>
            <p className="font-medium">{player.weight}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Age</p>
            <p className="font-medium">{player.age}</p>
          </div>
          <div>
            <p className="text-muted-foreground">ADP</p>
            <p className="font-medium">{player.adp.toFixed(1)}</p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-3">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Fantasy Stats</p>
          <div className="grid grid-cols-3 gap-2 text-sm mb-3">
            <div className="text-center">
              <p className="font-bold text-foreground">{player.stats.ppg}</p>
              <p className="text-xs text-muted-foreground">PPG</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">{player.stats.rpg}</p>
              <p className="text-xs text-muted-foreground">RPG</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">{player.stats.apg}</p>
              <p className="text-xs text-muted-foreground">APG</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="text-center">
              <p className="font-bold text-primary">{player.stats.fantasy_points}</p>
              <p className="text-xs text-muted-foreground">FPTS/G</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">{(player.stats.fg_percentage * 100).toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">FG%</p>
            </div>
          </div>
        </div>

        {!isDrafted && onDraft && (
          <button
            onClick={() => onDraft(player)}
            className="w-full mt-4 px-4 py-2 bg-gradient-primary text-white rounded-lg font-medium transition-all duration-200 hover:shadow-glow hover:scale-105 active:scale-95"
          >
            Draft Player
          </button>
        )}

        {isDrafted && (
          <div className="w-full mt-4 px-4 py-2 bg-muted/50 text-muted-foreground rounded-lg text-center text-sm font-medium">
            Drafted
          </div>
        )}
      </CardContent>
    </Card>
  );
}